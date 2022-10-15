import TelegramBot from 'node-telegram-bot-api'
import type { NextApiRequest, NextApiResponse } from 'next'

const token = process.env.TELEGRAM_TOKEN
const chat_id = process.env.TELEGRAM_CHAT_ID
const bot = new TelegramBot(token!, { polling: true });

type Data = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        console.log(req.body)
        let phone = req.body.phone.match(/\d/g).join('')

        phone = `+7${phone.slice(1, phone.length)}`
        bot.sendMessage(chat_id!,
            `name: ${req.body.name}\nphone: <a href="tel:${phone}">${phone}</a>${req.body.question && `\nquestion: ${req.body.question}`}`, { parse_mode: 'HTML' })

    }

    res.status(200).json({ message: 'you not supposed to be here' })
}
