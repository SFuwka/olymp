import styles from './groupsAndPrices.module.scss'
import { GroupsAndPricesCard } from './GroupsAndPricesCard'

const cards = [
    {
        key: 'group1',
        children: <img src='./images/group1.jpg' />,
        content: [
            {
                key: 'g1',
                head: 'Абонемент на 8 тренировок',
                body: ['2 раза в неделю по 45 минут 5000 р.', 'Разовое посещение 800 р.']
            },
        ]
    },
    {
        key: 'group2',
        children: <img src='./images/group2.jpg' />,
        content: [
            {
                key: 'g2',
                head: 'Абонемент на 8 тренировок',
                body: ['2 раза в неделю по 45 минут 5000 р.', 'Разовое посещение 800 р.']
            },
        ]
    },
    {
        key: 'group3',
        children: <img src='./images/group1.jpg' />,
        content: [
            {
                key: 'g3',
                head: 'Абонемент на 8 тренировок',
                body: ['2 раза в неделю по 45 минут 5000 р.', 'Разовое посещение 800 р.']
            },
        ]
    },
]

export const GroupsAndPrices = () => {
    return (
        <section className={styles.root}>
            <h2>ГРУППЫ И ЦЕНЫ</h2>
            {cards.map(card => {
                return <GroupsAndPricesCard key={card.key} content={card.content}>{card.children}</GroupsAndPricesCard>
            })}
        </section>
    )
}
