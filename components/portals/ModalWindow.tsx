import clsx from 'clsx'
import { RemoveScroll } from 'react-remove-scroll'
import ClientOnlyPortal from './ClientOnlyPortal'
import styles from './portals.module.scss'

interface modalProps {
    open: boolean
    form?: boolean
    handleClose: (e: React.MouseEvent) => void
    children: React.ReactNode
}

export const ModalWindow = ({ children, open, form, handleClose }: modalProps) => {
    return (
        <>
            {open &&
                <ClientOnlyPortal selector='#modal'>
                    <RemoveScroll>
                        <div className={styles.root} onClick={handleClose}>
                            <div className={clsx(styles.wrapper, form ? styles.moveTop : '')} >{children}</div>
                        </div>
                    </RemoveScroll>
                </ClientOnlyPortal>
            }
        </>
    )
}
