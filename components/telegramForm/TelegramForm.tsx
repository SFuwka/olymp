
import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { handlePhoneTyping } from '../../helpFunctions/phoneTyping'
import { TelegramButton } from './TelegramButton'
import styles from './telegramForm.module.scss'

interface TelegramFormProps {
    inModal?: boolean
    closeModal?: (e: React.MouseEvent, force: boolean) => void
    withQuestion?: boolean
}

export const TelegramForm = ({ inModal, closeModal, withQuestion }: TelegramFormProps) => {
    const context = useAppContext()
    const [formData, setFormData] = useState({ name: '', phone: '', question: '' })
    const [inProgress, setinProgress] = useState(false)

    const [errors, setErrors] =
        useState<{ nameError?: string | null, phoneError?: string | null }>({ nameError: null, phoneError: null })

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (!formData.name || !formData.phone || formData.phone.match(/\d/g)?.length !== 11) {
            if (!formData.name) {
                setErrors(prev => {
                    return { ...prev, nameError: 'поле обязательно' }
                })
            }
            if (!formData.phone) {
                setErrors(prev => {
                    return { ...prev, phoneError: 'поле обязательно' }
                })
                return
            }
            if (formData.phone.match(/\d/g)?.length !== 11) {
                return setErrors(prev => {
                    return { ...prev, phoneError: 'некорректный телефон' }
                })
            }
            return
        }
        setinProgress(true)
        fetch('/api/telegram',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then(res => {
                if (res.ok) {
                    context.setState({ TrialRequestSended: true })
                    if (closeModal) closeModal(e, true)
                }
            }).finally(() => setinProgress(false))

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => {
            if (e.target.name === 'phone') {
                setErrors(prev => {
                    return { ...prev, phoneError: null }
                })
                return { ...prev, [e.target.name]: handlePhoneTyping(e.target.value, prev.phone) }
            }
            setErrors(prev => {
                return { ...prev, nameError: null }
            })

            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <div className={inModal === true ? styles.rootInModal : styles.root}>
            <form>
                <div className={styles.inputContainer}>
                    <input autoFocus={inModal} onChange={handleChange} id='name' name='name' type="text" value={formData.name} />
                    <label className={formData.name && styles.labelFixed} htmlFor='name'>Имя</label>
                    {errors?.nameError && <span className={styles.error}>
                        {errors.nameError}
                    </span>}
                </div>

                <div className={styles.inputContainer}>
                    <input className={styles.phoneInput} onChange={handleChange} name='phone' value={formData.phone} id='phone' />
                    <label className={formData.phone && styles.labelFixed} htmlFor="phone">Телефон</label>
                    {errors?.phoneError && <span className={styles.error}>
                        {errors.phoneError}
                    </span>}
                </div>

                {withQuestion && <div className={styles.inputContainer}>
                    <textarea rows={4} onChange={handleChange} name='question' value={formData.question} id='question' />
                    <label className={formData.question && styles.labelFixed} htmlFor="question">Вопрос</label>
                </div>}
                <TelegramButton
                    disabled={inProgress || errors?.nameError !== null || errors.phoneError !== null}
                    onClick={handleClick}>
                    {withQuestion ? 'отправить' : 'записаться'}
                </TelegramButton>
            </form>
            <div> <p className={clsx(styles.policy, inModal ? styles.policyInModal : '')}>Отправляя данную форму вы соглашаетесь с
                политикой конфиденциальности</p></div>
        </div>
    )
}
