import db from '../db'

export interface LoginAttemptRow {
    ip: string
    fail_count: number
    locked_until: string | null
}

export function getAttempt(ip: string): LoginAttemptRow | undefined {
    return db.prepare(`SELECT * FROM login_attempts WHERE ip = ?`).get(ip) as
        | LoginAttemptRow
        | undefined
}

export function recordFailure(ip: string, maxFails: number, lockMinutes: number): LoginAttemptRow {
    const existing = getAttempt(ip)
    const failCount = (existing?.fail_count ?? 0) + 1

    let lockedUntil: string | null = existing?.locked_until ?? null
    let nextFailCount = failCount

    if (failCount >= maxFails) {
        lockedUntil = new Date(Date.now() + lockMinutes * 60 * 1000).toISOString()
        nextFailCount = 0 // the lock itself now guards further tries
    }

    db.prepare(
        `INSERT INTO login_attempts (ip, fail_count, locked_until) VALUES (?, ?, ?)
     ON CONFLICT(ip) DO UPDATE SET fail_count = excluded.fail_count, locked_until = excluded.locked_until`
    ).run(ip, nextFailCount, lockedUntil)

    return { ip, fail_count: nextFailCount, locked_until: lockedUntil }
}

export function clearAttempts(ip: string) {
    db.prepare(`DELETE FROM login_attempts WHERE ip = ?`).run(ip)
}
