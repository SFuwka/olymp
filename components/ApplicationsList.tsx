import { useCallback, useEffect, useState } from 'react'
import styles from './admin.module.css'

type Status = 'new' | 'viewed' | 'handled'

type AppItem = {
    id: number
    name: string
    phone: string
    question?: string
    clickedOn?: string
    createdAt: string
    status: Status
}

const barClass: Record<Status, string> = {
    new: styles.rowBarNew,
    viewed: styles.rowBarViewed,
    handled: styles.rowBarHandled,
}

export default function ApplicationsList() {
    const [applications, setApplications] = useState<AppItem[]>([])
    const [loading, setLoading] = useState(true)

    const load = useCallback(async () => {
        const res = await fetch('/api/admin/applications')
        if (!res.ok) return
        const data = await res.json()
        setApplications(data.applications)
        setLoading(false)
    }, [])

    useEffect(() => {
        load()
        // Poll periodically so other admins' handled/viewed changes show up
        // without needing a manual refresh. Push notifications cover the
        // "tab closed" case; this covers "tab open in the background".
        const interval = setInterval(load, 15000)
        return () => clearInterval(interval)
    }, [load])

    async function markViewed(app: AppItem) {
        if (app.status !== 'new') return
        setApplications((prev) =>
            prev.map((a) => (a.id === app.id ? { ...a, status: 'viewed' } : a))
        )
        await fetch(`/api/admin/applications/${app.id}/view`, { method: 'POST' })
    }

    async function markHandled(app: AppItem, e: React.MouseEvent) {
        e.stopPropagation()
        setApplications((prev) =>
            prev.map((a) => (a.id === app.id ? { ...a, status: 'handled' } : a))
        )
        await fetch(`/api/admin/applications/${app.id}/handle`, { method: 'POST' })
    }

    if (loading) return null

    if (applications.length === 0) {
        return <p className={styles.empty}>No applications yet.</p>
    }

    return (
        <div>
            {applications.map((app) => (
                <div
                    key={app.id}
                    className={styles.row}
                    onClick={() => markViewed(app)}
                >
                    <div className={`${styles.rowBar} ${barClass[app.status]}`} />
                    <div className={styles.rowMain}>
                        <div className={styles.rowName}>{app.name}</div>
                        <div className={styles.rowMeta}>
                            <a href={`tel:${app.phone}`} onClick={(e) => e.stopPropagation()}>
                                {app.phone}
                            </a>
                            {', submitted '}
                            {new Date(app.createdAt).toLocaleString()}
                            {app.clickedOn ? `, from ${app.clickedOn}` : ''}
                        </div>
                        {app.question && <div className={styles.rowQuestion}>{app.question}</div>}
                    </div>
                    <div className={styles.rowRight}>
                        {app.status === 'handled' ? (
                            <span className={styles.statusLabel}>Handled</span>
                        ) : (
                            <button className={styles.handleButton} onClick={(e) => markHandled(app, e)}>
                                Mark handled
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
