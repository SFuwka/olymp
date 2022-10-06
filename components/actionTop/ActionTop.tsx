import Link from 'next/link'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useWindowSize } from '../../helpFunctions/hooks/windowSize'
import { ModalWindow } from '../portals/ModalWindow'
import { TelegramButton } from '../telegramForm/TelegramButton'
import { TelegramForm } from '../telegramForm/TelegramForm'
import styles from './actionTop.module.scss'

export const ActionTop = () => {
    const windowWidth = useWindowSize()[0]
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
        <article className={styles.root}>
            <div className={styles.wrapper}>
                <h1>ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА<br /><span>СК</span> <span>&quot;ОЛИМП&quot;</span><br /><span>г. Пушкин</span></h1>
                <div className={styles.adressLinks}>
                    <Link href="https://yandex.ru/maps/10884/pushkin/?from=mapframe&ll=30.399200%2C59.719977&mode=usermaps&source=mapframe&um=constructor%3A7eb3410eadc2ed59f61dedd9861ba0fa59851643a326e3f957f88df1999e7bf8&utm_source=mapframe&z=17.25">
                        <a target='_blank'><p>Ул малая 9/3</p></a></Link>
                    <Link href="https://yandex.ru/maps/10884/pushkin/?from=mapframe&ll=30.382232%2C59.702416&mode=usermaps&source=mapframe&um=constructor%3A7eb3410eadc2ed59f61dedd9861ba0fa59851643a326e3f957f88df1999e7bf8&utm_source=mapframe&z=18'">
                        <a target='_blank'><p>ТРК Константиновский, ул. Полковая 1/25</p></a></Link>
                    <Link href="https://yandex.ru/maps/10884/pushkin/?from=mapframe&ll=30.415129%2C59.730934&source=mapframe&um=constructor%3A7eb3410eadc2ed59f61dedd9861ba0fa59851643a326e3f957f88df1999e7bf8&utm_source=mapframe&z=16.53">
                        <a target='_blank'><p>Бульвар Алексея Толстого д.50 к.1.</p></a></Link>
                </div>
                {!context.state.TrialRequestSended && <div>
                    <div className={styles.actionCall}> <strong>Запишитесь на первое занятие совершенно <br />
                        <span>БЕСПЛАТНО</span></strong></div>
                    {windowWidth > 900 || windowWidth < 750 && windowWidth > 450
                        ? <TelegramForm />
                        : <TelegramButton onClick={openModal}>Записаться на пробное занятие</TelegramButton>}
                    <p>Мы перезвоним вам и уточним детали</p>
                </div>}
                {context.state.TrialRequestSended && <div className={styles.trialRequestSended}>
                    <p>Благодарим за заявку!</p>
                    <p> Мы свяжемся с вами в ближайшее время.</p>
                </div>}
            </div>
            <ModalWindow form={true} handleClose={handleClose} open={modalOpened}>
                <div className={styles.modalContent}><TelegramForm closeModal={handleClose} inModal={true} /></div>
            </ModalWindow>
        </article>
    )
}
