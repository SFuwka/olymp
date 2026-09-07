import { useEffect, useState } from 'react'
import styles from './admin.module.scss'

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)))
}

type Status = 'unsupported' | 'unknown' | 'enabled' | 'denied'

export default function PushNotificationSetup() {
    const [status, setStatus] = useState<Status>('unknown')
    const [busy, setBusy] = useState(false)

    useEffect(() => {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.warn('Push notifications not supported in this browser')
            setStatus('unsupported')
            return
        }
        if (Notification.permission === 'denied') {
            setStatus('denied')
            return
        }
        navigator.serviceWorker.getRegistration().then(async (reg) => {
            const sub = await reg?.pushManager.getSubscription()
            setStatus(sub ? 'enabled' : 'unknown')
        })
    }, [])

    async function enable() {
        setBusy(true)
        try {
            const reg = await navigator.serviceWorker.register('/sw.js')
            const permission = await Notification.requestPermission()
            if (permission !== 'granted') {
                setStatus('denied')
                return
            }

            const keyRes = await fetch('/api/admin/push/vapid-public-key')
            const { publicKey } = await keyRes.json()
            if (!publicKey) {
                console.error('VAPID public key not configured on server')
                return
            }

            const sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey),
            })

            await fetch('/api/admin/push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sub.toJSON()),
            })

            setStatus('enabled')
        } catch (err) {
            console.error('Failed to enable push notifications', err)
        } finally {
            setBusy(false)
        }
    }

    if (status === 'unsupported') return null
    if (status === 'enabled') {
        return <span className={styles.statusLabel}>Notifications on</span>
    }

    return (
        <button
            className={`${styles.button} ${styles.buttonGhost}`}
            style={{ width: 'auto', marginTop: 0 }}
            onClick={enable}
            disabled={busy}
        >
            {status === 'denied'
                ? 'Notifications blocked — check browser settings'
                : busy
                    ? 'Enabling…'
                    : 'Enable notifications'}
        </button>
    )
}
