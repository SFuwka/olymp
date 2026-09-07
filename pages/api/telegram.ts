import TelegramBot from 'node-telegram-bot-api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApplication } from '../../lib/store/applications'
import { listSubscriptions, deleteSubscription } from '../../lib/store/pushSubscriptions'
import webpush from '../../lib/webpush'

const token = process.env.TELEGRAM_TOKEN
const chat_id = process.env.TELEGRAM_CHAT_ID

const bot = new TelegramBot(token!, { polling: false })

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        res.status(200).json({ message: 'you not supposed to be here' })
        return
    }

    let meta = ''
    if (req.body.metaInfo !== undefined) {
        meta = req.body.metaInfo
    }
    let phone = req.body.phone.match(/\d/g).join('')
    phone = `+7${phone.slice(1, phone.length)}`

    const name = req.body.name
    const question = req.body.question as string | undefined

    // 1. Save to DB first (fast, local)
    let applicationId: number | undefined
    try {
        applicationId = createApplication({
            name,
            phone,
            question,
            clickedOn: meta || undefined,
        })
    } catch (err) {
        console.error('Failed to save application to DB', err)
        // Still return 200 so the UI can show success; lead is the important part
    }

    // 2. Reply immediately — client no longer waits for Telegram / push
    res.status(200).json({ message: 'ok' })

    // 3. Background: Telegram (do not await)
    bot
        .sendMessage(
            chat_id!,
            `name: ${name}\nphone: <a href="tel:${phone}">${phone}</a>${
                question ? `\nquestion: ${question}` : ''
            }${meta ? `\nclicked on: ${meta}` : ''}`,
            { parse_mode: 'HTML' }
        )
        .catch((err) => console.error('Failed to send Telegram message', err))

    // 4. Background: web push (do not await)
    if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
        const subs = listSubscriptions()
        const payload = JSON.stringify({
            title: 'New application',
            body: `${name} — ${phone}`,
            url: '/admin',
            applicationId,
        })

        // Fire-and-forget; each failure is handled per-subscription
        Promise.all(
            subs.map(async (sub) => {
                try {
                    await webpush.sendNotification(
                        {
                            endpoint: sub.endpoint,
                            keys: { p256dh: sub.p256dh, auth: sub.auth },
                        },
                        payload
                    )
                } catch (err: unknown) {
                    const statusCode = (err as { statusCode?: number })?.statusCode
                    if (statusCode === 404 || statusCode === 410) {
                        deleteSubscription(sub.endpoint)
                    } else {
                        console.error('Push send failed', err)
                    }
                }
            })
        ).catch((err) => console.error('Failed to send push notifications', err))
    }
}