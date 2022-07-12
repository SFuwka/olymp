
import React, { useEffect, useState } from 'react'
import { handlePhoneTyping } from '../../helpFunctions/phoneTyping'
import { TelegramButton } from './TelegramButton'
import styles from './telegramForm.module.scss'


export const TelegramForm = () => {
    const [formData, setFormData] = useState({ name: '', phone: '' })
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
    }

    useEffect(() => {
        setFormData({ ...formData, phone })
    }, [phone])

    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(prev => {
            let res = handlePhoneTyping(e.target.value, prev)
            return res
        })

    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div className={styles.root}>
            <form>
                <div className={styles.inputContainer}>
                    <input onChange={handleNameChange} id='name' name='name' type="text" value={name} />
                    <label className={name && styles.labelFixed} htmlFor="name">Имя</label>
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.phoneInput} onChange={handleType} value={phone} id='phone' />
                    <label className={phone && styles.labelFixed} htmlFor="name">Телефон</label>
                </div>
                <TelegramButton onClick={handleClick}>записаться</TelegramButton>
            </form>
        </div>
    )
}
