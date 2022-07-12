import React from 'react'
import styles from './telegramForm.module.scss'

interface buttonProps {
    children: React.ReactNode
    onClick: React.MouseEventHandler<HTMLElement>
}

export const TelegramButton = ({ children, onClick }: buttonProps) => {
    return (
        <button onClick={onClick} className={styles.button}>{children}</button >
    )
}
