import db from '../db'

export interface PushSubscriptionRow {
    endpoint: string
    session_id: string
    p256dh: string
    auth: string
}

export function upsertSubscription(input: {
    endpoint: string
    sessionId: string
    p256dh: string
    auth: string
}) {
    db.prepare(
        `INSERT INTO push_subscriptions (endpoint, session_id, p256dh, auth) VALUES (?, ?, ?, ?)
     ON CONFLICT(endpoint) DO UPDATE SET session_id = excluded.session_id, p256dh = excluded.p256dh, auth = excluded.auth`
    ).run(input.endpoint, input.sessionId, input.p256dh, input.auth)
}

export function listSubscriptions(): PushSubscriptionRow[] {
    return db.prepare(`SELECT * FROM push_subscriptions`).all() as PushSubscriptionRow[]
}

export function deleteSubscription(endpoint: string) {
    db.prepare(`DELETE FROM push_subscriptions WHERE endpoint = ?`).run(endpoint)
}
