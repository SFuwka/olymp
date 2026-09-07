import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteApplication } from '../../../../../lib/store/applications'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end()
    }
    const id = Number(req.query.id)
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: 'invalid id' })
    }
    deleteApplication(id)
    res.status(200).json({ ok: true })
}