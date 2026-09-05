import type { NextApiRequest, NextApiResponse } from 'next'
import { randomUUID } from 'crypto'
import { getAttempt, recordFailure, clearAttempts } from '../../../lib/store/loginAttempts'
import { getSession } from '../../../lib/session'

const MAX_FAILS = 3
const LOCK_MINUTES = 15

function getClientIp(req: NextApiRequest): string {
    const fwd = req.headers['x-forwarded-for']
    if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim()
    return req.socket.remoteAddress || 'unknown'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    const { password } = req.body as { password?: string }
    const ip = getClientIp(req)

    const existing = getAttempt(ip)
    if (existing?.locked_until && new Date(existing.locked_until).getTime() > Date.now()) {
        const secondsLeft = Math.ceil((new Date(existing.locked_until).getTime() - Date.now()) / 1000)
        res.status(429).json({
            message: `Too many attempts. Try again in ${Math.ceil(secondsLeft / 60)} min.`,
        })
        return
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
        res.status(500).json({ message: 'Server misconfigured' })
        return
    }

    if (!password || password !== adminPassword) {
        const updated = recordFailure(ip, MAX_FAILS, LOCK_MINUTES)
        const nowLocked = updated.locked_until && new Date(updated.locked_until).getTime() > Date.now()
        res.status(401).json({
            message: nowLocked ? `Too many attempts. Try again in ${LOCK_MINUTES} min.` : 'Wrong password',
        })
        return
    }

    clearAttempts(ip)

    const session = await getSession(req, res)
    session.isAdmin = true
    session.sessionId = randomUUID()
    await session.save()

    res.status(200).json({ message: 'ok' })
}
