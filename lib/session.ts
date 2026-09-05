import { getIronSession, IronSession, SessionOptions } from 'iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface SessionData {
    isAdmin?: boolean
    // Unique per browser login. The SAME shared admin password can be entered
    // by many people; each login gets its own sessionId, which is what lets
    // "new"/"viewed" be tracked per-person while "handled" stays global.
    sessionId?: string
}

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    throw new Error(
        'Missing/too short SESSION_SECRET env var (needs to be at least 32 characters)'
    )
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET,
    cookieName: 'admin_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
}

export async function getSession(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<IronSession<SessionData>> {
    return getIronSession<SessionData>(req, res, sessionOptions)
}

/**
 * Wrap an API handler to require a logged-in admin session.
 * Attaches the resolved session as req.session.
 */
export function withAdminAuth(
    handler: (
        req: NextApiRequest & { session: IronSession<SessionData> },
        res: NextApiResponse
    ) => unknown | Promise<unknown>
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getSession(req, res)
        if (!session.isAdmin || !session.sessionId) {
            res.status(401).json({ message: 'Not authenticated' })
            return
        }
        ;(req as NextApiRequest & { session: IronSession<SessionData> }).session = session
        return handler(req as NextApiRequest & { session: IronSession<SessionData> }, res)
    }
}
