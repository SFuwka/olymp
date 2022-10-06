import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { CloseIcon } from '../../assets/svg/CloseIcon'
import { useAppContext } from '../../context/AppContext'
import ClientOnlyPortal from './ClientOnlyPortal'
import styles from './portals.module.scss'

interface NotificationProps {
    children: React.ReactNode
}

export const Notification = ({ children }: NotificationProps) => {
    const context = useAppContext()
    const [notificationOpen, setNotificationOpen] = useState(false)
    const handleClose = () => {
        setNotificationOpen(false)
    }

    useEffect(() => {
        if (context.state.TrialRequestSended) setNotificationOpen(true)
    }, [context.state.TrialRequestSended])

    useEffect(() => {
        if (notificationOpen) {
            setTimeout(() => {
                setNotificationOpen(false)
            }, 5000)
        }
    }, [notificationOpen])
    return (
        <>
            <ClientOnlyPortal selector='#notification'>
                <div className={styles.notificatonRoot}>
                    <div className={clsx(styles.notificationWrapper, notificationOpen ? styles.notificationOpen : styles.notificationClosed)}>
                        {children}
                        <div className={styles.closeIcon} onClick={handleClose}><CloseIcon /></div>
                    </div>
                </div>
            </ClientOnlyPortal>
        </>
    )
}
