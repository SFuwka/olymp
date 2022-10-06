import React from 'react'
import styles from './telegramForm.module.scss'

interface buttonProps {
    children: React.ReactNode
    disabled?: boolean
    onClick: React.MouseEventHandler<HTMLElement>
}

export const TelegramButton = ({ children, onClick, disabled }: buttonProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={styles.button}>{children}</button >
    )
}
