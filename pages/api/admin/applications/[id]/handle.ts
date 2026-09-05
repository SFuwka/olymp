import type { NextApiResponse } from 'next'
import { markHandled } from '../../../../../lib/store/applications'
import { withAdminAuth } from '../../../../../lib/session'

export default withAdminAuth(async (req, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    const { id } = req.query

    markHandled(Number(id))

    res.status(200).json({ message: 'ok' })
})
