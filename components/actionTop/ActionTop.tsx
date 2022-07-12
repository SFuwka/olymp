import Link from 'next/link'
import { useState } from 'react'
import { useWindowSize } from '../../helpFunctions/hooks/windowSize'
import { ModalWindow } from '../modal/ModalWindow'
import { TelegramButton } from '../telegramForm/TelegramButton'
import { TelegramForm } from '../telegramForm/TelegramForm'
import styles from './actionTop.module.scss'

export const ActionTop = () => {
    const windowWidth = useWindowSize()[0]
    const [modalOpened, setModalOpened] = useState(false)

    const openModal = () => {
        setModalOpened(true)
    }

    const handleClose = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) setModalOpened(false)
    }

    return (
        <article className={styles.root}>
            <div className={styles.wrapper}>
                <h1>ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА<br /><span>СК</span> <span>&quot;ОЛИМП&quot;</span><br /><span>г. Пушник</span></h1>
                <div className={styles.adressLinks}>
                    <Link href="#"><a ><h3>Ул малая 9/3</h3></a></Link>
                    <Link href="#"><a ><h3>ТРК Константиновский, ул. Полковая 1/25</h3></a></Link>
                    <Link href="#"><a ><h3>Бульвар Алексея Толстого д.50 к.1.</h3></a></Link>
                </div>
                <div className={styles.actionCall}> <h3>Запишитесь на первое занятие совершенно <br />
                    <span>БЕСПЛАТНО</span></h3></div>
                {windowWidth > 900 ? <TelegramForm /> : <TelegramButton onClick={openModal}>Записаться на пробное занятие</TelegramButton>}
                <p>Мы перезвоним вам и согласуем время</p>
            </div>
            <ModalWindow handleClose={handleClose} open={modalOpened}>
                <div className={styles.modalContent}>test</div>
            </ModalWindow>
        </article>
    )
}
