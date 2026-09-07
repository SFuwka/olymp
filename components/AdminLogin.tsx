import { useState } from 'react'
import styles from './admin.module.scss'

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function submit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.message || 'Wrong password')
                return
            }
            onSuccess()
        } catch (err) {
            setError('Network error, try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.loginWrap}>
            <form className={styles.loginCard} onSubmit={submit}>
                <h1 className={styles.loginTitle}>Коробка пандоры</h1>
                <p className={styles.loginSub}>Вводите что-то на свой страх и риск.</p>
                <input
                    className={styles.input}
                    type="password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Предупреждал..."
                />
                <button className={styles.button} type="submit" disabled={loading || !password}>
                    {loading ? 'Checking…' : 'Ok'}
                </button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    )
}
