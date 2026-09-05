import { useEffect, useState } from 'react'
import AdminLogin from '../components/AdminLogin'
import ApplicationsList from '../components/ApplicationsList'
import PushNotificationSetup from '../components/PushNotificationSetup'
import styles from '../components/admin.module.css'

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

    useEffect(() => {
        fetch('/api/admin/me')
            .then((r) => r.json())
            .then((d) => setIsAdmin(!!d.isAdmin))
    }, [])

    async function logout() {
        await fetch('/api/admin/logout', { method: 'POST' })
        setIsAdmin(false)
    }

    if (isAdmin === null) return null

    if (!isAdmin) {
        return (
            <div className={styles.page}>
                <AdminLogin onSuccess={() => setIsAdmin(true)} />
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Applications</h1>
                <div className={styles.headerActions}>
                    <PushNotificationSetup />
                    <button
                        className={`${styles.button} ${styles.buttonGhost}`}
                        style={{ width: 'auto', marginTop: 0 }}
                        onClick={logout}
                    >
                        Log out
                    </button>
                </div>
            </div>
            <div className={styles.list}>
                <ApplicationsList />
            </div>
        </div>
    )
}
