import clsx from 'clsx'
import React from 'react'
import styles from './accordion.module.scss'

interface IAccordion {
    data: {
        id: string
        label: string
        content: string[]
    }[]
    icon?: JSX.Element
}

export const Accordion = ({ data, icon }: IAccordion) => {
    return (
        <>
            {data.map((pair, i) => {
                return <label className={styles.accordion} key={pair.id} htmlFor={pair.id}>
                    <input id={pair.id} type="checkbox" />
                    <div className={clsx(styles.title, i === 0 || i === data.length - 1 ? i === 0 ? styles.firstLabel : styles.lastLabel : undefined)}>
                        <h3>{pair.label}</h3>
                    </div>
                    <div className={styles.content}>
                        {pair.content.map((sentence, i) => {
                            return <div key={i}>
                                {icon}
                                <p>{sentence}</p>
                            </div>
                        })}
                    </div>
                </label>
            })}
        </>
    )
}
