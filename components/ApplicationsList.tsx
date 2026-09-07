import { useCallback, useEffect, useState } from 'react'
import styles from './admin.module.scss'
import { ModalWindow } from './portals/ModalWindow'

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

type ConfirmState =
    | { type: 'delete'; app: AppItem }
    | { type: 'unhandle'; app: AppItem }
    | null

export default function ApplicationsList() {
    const [applications, setApplications] = useState<AppItem[]>([])
    const [loading, setLoading] = useState(true)
    const [confirm, setConfirm] = useState<ConfirmState>(null)

    const load = useCallback(async () => {
        const res = await fetch('/api/admin/applications')
        if (!res.ok) return
        const data = await res.json()
        setApplications(data.applications)
        setLoading(false)
    }, [])

    useEffect(() => {
        load()
        const interval = setInterval(load, 15000)
        return () => clearInterval(interval)
    }, [load])

    async function deleteApp(app: AppItem) {
        setApplications((prev) => prev.filter((a) => a.id !== app.id))
        await fetch(`/api/admin/applications/${app.id}/delete`, { method: 'POST' })
        setConfirm(null)
    }

    async function markViewed(app: AppItem) {
        if (app.status !== 'new') return
        setApplications((prev) =>
            prev.map((a) => (a.id === app.id ? { ...a, status: 'viewed' } : a))
        )
        await fetch(`/api/admin/applications/${app.id}/view`, { method: 'POST' })
    }

    async function toggleHandled(app: AppItem) {
        if (app.status === 'handled') {
            setConfirm({ type: 'unhandle', app })
            return
        }

        // Optimistic mark as handled
        setApplications((prev) =>
            prev.map((a) => (a.id === app.id ? { ...a, status: 'handled' } : a))
        )
        await fetch(`/api/admin/applications/${app.id}/handle`, { method: 'POST' })
    }

    async function confirmUnhandle(app: AppItem) {
        setApplications((prev) =>
            prev.map((a) => (a.id === app.id ? { ...a, status: 'viewed' } : a))
        )
        await fetch(`/api/admin/applications/${app.id}/unhandle`, { method: 'POST' })
        setConfirm(null)
    }

    function handleConfirmClose(e: React.MouseEvent) {
        e.stopPropagation()
        setConfirm(null)
    }

    if (loading) return null

    if (applications.length === 0) {
        return <p className={styles.empty}>No applications yet.</p>
    }

    return (
        <>
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
                                <a
                                    href={`tel:${app.phone}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {app.phone}
                                </a>
                                {', submitted '}
                                {new Date(app.createdAt).toLocaleString()}
                                {app.clickedOn ? `, from ${app.clickedOn}` : ''}
                            </div>
                            {app.question && (
                                <div className={styles.rowQuestion}>{app.question}</div>
                            )}
                        </div>

                        <div className={styles.rowRight}>
                            <button
                                className={
                                    app.status === 'handled'
                                        ? styles.handleButtonHandled
                                        : styles.handleButton
                                }
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleHandled(app)
                                }}
                            >
                                {app.status === 'handled' ? 'Oбработана' : 'не обработана'}
                            </button>

                            <button
                                className={styles.deleteButton}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setConfirm({ type: 'delete', app })
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ModalWindow open={!!confirm} handleClose={handleConfirmClose}>
                {confirm && (
                    <div className={styles.modalContent}>
                        {confirm.type === 'delete' ? (
                            <>
                                <p className={styles.modalText}>
                                    Удалить заявку от <strong>{confirm.app.name}</strong>{' '}
                                    ({confirm.app.phone})?
                                </p>
                                <div className={styles.modalActions}>
                                    <button
                                        className={styles.modalButtonDanger}
                                        onClick={() => deleteApp(confirm.app)}
                                    >
                                        Удалить
                                    </button>
                                    <button
                                        className={styles.modalButtonGhost}
                                        onClick={handleConfirmClose}
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className={styles.modalText}>
                                    Снять статус «обработана» с заявки от{' '}
                                    <strong>{confirm.app.name}</strong>?
                                </p>
                                <div className={styles.modalActions}>
                                    <button
                                        className={styles.modalButton}
                                        onClick={() => confirmUnhandle(confirm.app)}
                                    >
                                        Да, снять
                                    </button>
                                    <button
                                        className={styles.modalButtonGhost}
                                        onClick={handleConfirmClose}
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </ModalWindow>
        </>
    )
}