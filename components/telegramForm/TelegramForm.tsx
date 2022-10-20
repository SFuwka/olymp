
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

interface CheckboxProps {
    id: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    error?: string | null
    className?: string
}

const Checkbox = ({ id, onChange, error, className }: CheckboxProps) => {
    return <div className={styles.checkBoxContainer}>
        <input onChange={onChange} type="checkbox" id={id} />
        <label className={clsx(styles.policy, className)} htmlFor={id}>
            Я даю своё согласие на обработку моей персональной информации</label>
        {error && <span style={{ display: 'block' }} className={styles.error}>{error}</span>}
    </div>
}

export const TelegramForm = ({ inModal, closeModal, withQuestion }: TelegramFormProps) => {
    const context = useAppContext()
    const [formData, setFormData] = useState({ name: '', phone: '', question: '' })
    const [inProgress, setinProgress] = useState(false)
    const [checked, setChecked] = useState(false)

    const [errors, setErrors] =
        useState<{ nameError?: string | null, phoneError?: string | null, checkError?: string | null }>
            ({ nameError: null, phoneError: null, checkError: null })

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (!formData.name || !formData.phone || formData.phone.match(/\d/g)?.length !== 11 || !checked) {
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
            if (!checked) {
                return setErrors(prev => {
                    return { ...prev, checkError: 'согласитесь на обработку персональных данных' }
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

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, checkError: null }))
        setChecked(e.target.checked)
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
                {inModal && <Checkbox id='checkBox1' onChange={e => handleCheck(e)} error={errors.checkError} />}
                <TelegramButton
                    disabled={inProgress || errors?.nameError !== null || errors.phoneError !== null}
                    onClick={handleClick}>
                    {withQuestion ? 'отправить' : 'записаться'}
                </TelegramButton>
            </form>
            {!inModal && < Checkbox id='checkBox2' className={styles.checkbox} error={errors.checkError} onChange={(e) => handleCheck(e)} />}
        </div>
    )
}
