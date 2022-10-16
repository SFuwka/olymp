import Link from 'next/link'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { ModalWindow } from '../portals/ModalWindow'
import { TelegramForm } from '../telegramForm/TelegramForm'
import styles from './faq.module.scss'

export const MoreInfo = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const context = useAppContext()
    const openModal = () => {
        setModalOpened(true)
    }

    const handleClose = (e: React.MouseEvent, force?: boolean) => {
        if (e.currentTarget === e.target) return setModalOpened(false)
        if (force) return setModalOpened(false)
    }
    return (
        <article className={styles.moreInfoRoot}>
            <div><strong>Остались вопросы?</strong></div>
            <div className={styles.info}>
                <strong>Позвоните нам по телефонам:</strong>
                <div className={styles.phones}>
                    <Link href='tel:+7 951 666 7113'>+7 951 666 7113</Link>
                    <Link href='tel:+7 981 731 8152'>+7 981 731 8152</Link>
                </div>
                {!context.state.TrialRequestSended && <>
                    <p>или оставьте свой номер телефона и мы вам перезвоним</p>
                    <button onClick={openModal}>задать вопрос</button>
                </>}
            </div>
            <ModalWindow form={true} handleClose={handleClose} open={modalOpened}>
                <TelegramForm withQuestion={true} closeModal={handleClose} inModal={true} />
            </ModalWindow>
        </article>
    )
}
