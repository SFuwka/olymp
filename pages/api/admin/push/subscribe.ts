import type { NextApiResponse } from 'next'
import { upsertSubscription } from '../../../../lib/store/pushSubscriptions'
import { withAdminAuth } from '../../../../lib/session'

export default withAdminAuth(async (req, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    const sub = req.body as {
        endpoint: string
        keys: { p256dh: string; auth: string }
    }

    if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
        res.status(400).json({ message: 'Invalid subscription' })
        return
    }

    upsertSubscription({
        endpoint: sub.endpoint,
        sessionId: req.session.sessionId as string,
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth,
    })

    res.status(200).json({ message: 'ok' })
})
