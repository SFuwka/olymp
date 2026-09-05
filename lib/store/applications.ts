import db from '../db'

export type Status = 'new' | 'viewed' | 'handled'

export interface ApplicationRow {
    id: number
    name: string
    phone: string
    question: string | null
    clicked_on: string | null
    handled: number
    handled_at: string | null
    created_at: string
}

export interface ApplicationWithStatus {
    id: number
    name: string
    phone: string
    question: string | null
    clickedOn: string | null
    createdAt: string
    status: Status
}

export function createApplication(input: {
    name: string
    phone: string
    question?: string
    clickedOn?: string
}) {
    const stmt = db.prepare(
        `INSERT INTO applications (name, phone, question, clicked_on) VALUES (?, ?, ?, ?)`
    )
    const info = stmt.run(input.name, input.phone, input.question ?? null, input.clickedOn ?? null)
    return info.lastInsertRowid as number
}

// Returns every application with a status computed relative to ONE viewer's
// sessionId: handled beats everything (global), otherwise viewed/new depends
// on whether that session shows up in application_views for that row.
export function listApplicationsForSession(sessionId: string): ApplicationWithStatus[] {
    const rows = db
        .prepare(
            `SELECT a.*,
              EXISTS(
                SELECT 1 FROM application_views v
                WHERE v.application_id = a.id AND v.session_id = ?
              ) AS viewed_by_me
       FROM applications a
       ORDER BY a.created_at DESC`
        )
        .all(sessionId) as (ApplicationRow & { viewed_by_me: number })[]

    return rows.map((row) => {
        let status: Status = 'new'
        if (row.handled) status = 'handled'
        else if (row.viewed_by_me) status = 'viewed'

        return {
            id: row.id,
            name: row.name,
            phone: row.phone,
            question: row.question,
            clickedOn: row.clicked_on,
            createdAt: row.created_at,
            status,
        }
    })
}

export function markViewed(applicationId: number, sessionId: string) {
    db.prepare(
        `INSERT OR IGNORE INTO application_views (application_id, session_id) VALUES (?, ?)`
    ).run(applicationId, sessionId)
}

export function markHandled(applicationId: number) {
    db.prepare(
        `UPDATE applications SET handled = 1, handled_at = datetime('now') WHERE id = ?`
    ).run(applicationId)
}
