import Image from 'next/image'
import styles from './groupsAndPrices.module.scss'
import { GroupsAndPricesCard } from './GroupsAndPricesCard'

const cards = [
    {
        key: 'group1',
        children: <img alt='гимнастки начальной подготовки' src='/images/group1.webp' />,
        groupName: 'Группы художественной гимнастики, начальная подготовка от 3 до 6 лет',
        haveButton: true,
        content: [
            {
                key: 'g1',
                head: <h3>Абонемент на <span>8 тренировок</span></h3>,
                body: ['2 раза в неделю по 45 минут 5000 р.', 'Разовое посещение 800 р.', '2 раза в неделю по часу 6000 р.']
            },
        ]
    },
    {
        key: 'group2',
        children: <img alt='гимнастки среднего уровня подготовки' src='/images/group2.webp' />,
        groupName: 'Группы художественной гимнастики от 6 лет',
        haveButton: true,
        content: [
            {
                key: 'g2-1',
                head: <h3>Абонемент на <span>8 тренировок</span></h3>,
                body: ['2 раза в неделю по 1,5 часа 6500 р.', 'Разовое посещение 900 р.']
            },
            {
                key: 'g2-2',
                head: <h3>Абонемент на <span>12 тренировок</span></h3>,
                body: ['3 раза в неделю по 1,5 часа 7500 р.', 'Разовое посещение 900 р.']
            }
        ]
    },
    {
        key: 'group3',
        children: <img alt='гимнастки продвинутого уровня' src='/images/group3.webp' />,
        groupName: 'Сборная учебно-тренировочная группа  художественной гимнастики',
        content: [
            {
                key: 'g3',
                body: ['Разовых посещений нет', 'Попасть в группу можно после согласования с тренерским составом и успешного прохождения испытательного срока.']
            },
        ]
    },
]

export const GroupsAndPrices = () => {
    return (
        <section id='prices' className={styles.root}>
            <h2>ГРУППЫ И ЦЕНЫ</h2>
            <div className={styles.content}>
                {cards.map(card => {
                    return <GroupsAndPricesCard
                        groupName={card.groupName}
                        haveButton={card.haveButton}
                        key={card.key}
                        content={card.content}>
                        {card.children}
                    </GroupsAndPricesCard>
                })}
            </div>
        </section>
    )
}
