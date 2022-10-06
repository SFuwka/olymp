import { useState } from 'react';
import { CheckSvg } from '../../assets/svg/CheckSvg';
import { useAppContext } from '../../context/AppContext';
import { ModalWindow } from '../portals/ModalWindow';
import { TelegramForm } from '../telegramForm/TelegramForm';
import styles from './groupsAndPrices.module.scss'

export interface GroupsAndPricesCardProps {
    children: React.ReactNode
    groupName: string
    content: {
        key: string;
        head?: JSX.Element;
        body: string[];
    }[]
    haveButton?: boolean
}



export const GroupsAndPricesCard = ({ children, groupName, content, haveButton }: GroupsAndPricesCardProps) => {
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
        <article className={styles.cardRoot}>
            <div className={styles.imageWrapper}>{children}</div>
            <h2>{groupName}</h2>
            {content.map(content => {
                return <div className={styles.cardContent} key={content.key}>
                    {content.head}
                    {content.body.map((sentence, i) => {
                        return <div key={i} className={styles.sentence}>
                            <div className={styles.svgContainer}><CheckSvg /></div>
                            <p>{sentence}</p>
                        </div>
                    })}
                </div>
            })}
            {haveButton && <button disabled={context.state.TrialRequestSended}
                className={context.state.TrialRequestSended ? styles.buttonDisabled : ''}
                onClick={openModal}>Пробное занятие - бесплатно.</button>}
            <ModalWindow form={true} handleClose={handleClose} open={modalOpened}>
                <div className={styles.modalContent}><TelegramForm closeModal={handleClose} inModal={true} /></div>
            </ModalWindow>
        </article>
    )
}
