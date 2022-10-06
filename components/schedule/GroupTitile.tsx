import React, { useState } from 'react'
import { ExpandMore } from '../../assets/svg/ExpandMore'
import { useAppContext } from '../../context/AppContext'
import { ModalWindow } from '../portals/ModalWindow'
import { TelegramForm } from '../telegramForm/TelegramForm'

interface IGropupCard {
    coach: string
    age: string
    adress: string
}

export const GroupTitle = ({ adress, age, coach }: IGropupCard) => {
    const [modalOpened, setModalOpened] = useState(false)
    const context = useAppContext()
    const openModal = () => {
        setModalOpened(true)
    }

    const handleClose = (e: React.MouseEvent, force?: boolean) => {
        if (e.currentTarget === e.target) return setModalOpened(false)
        if (force) return setModalOpened(false)
    }
    return <div>

        <p>{adress}</p>
        <p>{age}</p>
        <p>{coach}</p>
        {!context.state.TrialRequestSended && <button onClick={openModal}>записаться</button>}

        <ExpandMore />
        <ModalWindow form={true} handleClose={handleClose} open={modalOpened}><TelegramForm closeModal={handleClose} inModal={true} /></ModalWindow>
    </div>
}
