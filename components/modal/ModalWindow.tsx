import React, { useEffect, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import ClientOnlyPortal from './ClientOnlyPortal'
import styles from './modal.module.scss'

interface modalProps {
    open: boolean
    handleClose: (e: React.MouseEvent) => void
    children: React.ReactNode
}

export const ModalWindow = ({ children, open, handleClose }: modalProps) => {
    return (
        <>
            {open &&
                <ClientOnlyPortal selector='#modal'>
                    <RemoveScroll>
                        <div className={styles.root} onClick={handleClose}>
                            <div className={styles.wrapper}>{children}</div>
                        </div>
                    </RemoveScroll>
                </ClientOnlyPortal>
            }
        </>
    )
}
