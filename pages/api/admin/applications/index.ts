import type { NextApiResponse } from 'next'
import { listApplicationsForSession } from '../../../../lib/store/applications'
import { withAdminAuth } from '../../../../lib/session'

export default withAdminAuth(async (req, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    const sessionId = req.session.sessionId as string
    const applications = listApplicationsForSession(sessionId)

    res.status(200).json({ applications })
})
