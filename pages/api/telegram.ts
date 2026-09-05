import TelegramBot from 'node-telegram-bot-api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApplication } from '../../lib/store/applications'
import { listSubscriptions, deleteSubscription } from '../../lib/store/pushSubscriptions'
import webpush from '../../lib/webpush'

const token = process.env.TELEGRAM_TOKEN
const chat_id = process.env.TELEGRAM_CHAT_ID

// IMPORTANT: polling must be false here. `polling: true` in a serverless/API-route
// context spins up a new long-polling bot on every cold start, and Telegram only
// allows one poller per bot token — the extras collide (409 Conflict), which is
// the most likely cause of "bot is unstable". This route only ever SENDS
// messages, it never needs to receive them, so polling should stay off.
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

    // 1. Save to the local SQLite db first — this is the source of truth,
    // independent of Telegram, and doesn't need any network call.
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
    }

    // 2. Best-effort Telegram notification. Wrapped so a flaky/blocked Telegram
    // API never prevents the application from being saved or the response from returning.
    try {
        bot.sendMessage(
            chat_id!,
            `name: ${name}\nphone: <a href="tel:${phone}">${phone}</a>${question ? `\nquestion: ${question}` : ''
            }${meta ? `\nclicked on: ${meta}` : ''}`,
            { parse_mode: 'HTML' }
        )
    } catch (err) {
        console.error('Failed to send Telegram message', err)
    }

    // 3. Best-effort web push to every admin who enabled notifications.
    try {
        if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
            const subs = listSubscriptions()
            const payload = JSON.stringify({
                title: 'New application',
                body: `${name} — ${phone}`,
                url: '/admin',
                applicationId,
            })

            await Promise.all(
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
                        // 404/410 = subscription is dead (user revoked it, browser data cleared, etc.)
                        if (statusCode === 404 || statusCode === 410) {
                            deleteSubscription(sub.endpoint)
                        } else {
                            console.error('Push send failed', err)
                        }
                    }
                })
            )
        }
    } catch (err) {
        console.error('Failed to send push notifications', err)
    }

    res.status(200).json({ message: 'ok' })
}
