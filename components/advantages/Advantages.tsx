import { ChildSvg } from '../../assets/svg/ChildSvg'
import { CompetitionsSvg } from '../../assets/svg/CompetitionsSvg'
import { EducationSvg } from '../../assets/svg/EducationSvg'
import { IndividualSvg } from '../../assets/svg/IndividualSvg'
import { AdvantageCard } from './AdvantageCard'
import styles from './advantages.module.scss'

const cards = [
    {
        key: 'educationCard',
        child: <EducationSvg />,
        heading: 'ПРОФЕССИОНАЛЬНЫЕ ТРЕНЕРЫ',
        description: 'Все наши тренеры получили профильное тренерское образование и имеют опыт работы с детьми'
    },
    {
        key: 'childCard',
        child: <ChildSvg />,
        heading: 'Принимаем в группы начальной подготовки детей от 3 до 13 лет'.toUpperCase(),
        description: 'Занятия с детьми любого возраста начиная с трех лет.'
    },
    {
        key: 'competitionCard',
        child: <CompetitionsSvg />,
        heading: 'УЧАСТИЕ В СОРЕВНОВАНИЯХ',
        description: 'Наши юные спортсменки с первого года тренировок участвуют в соревнованиях и повышают свое мастерство'
    },
    {
        key: 'individualCard',
        child: <IndividualSvg />,
        heading: 'СОСТАВЛЕНИЕ ИНДИВИДУАЛЬНЫХ ПРОГРАММ',
        description: 'Опытным и начинающим гимнасткам мы составляем индивидуальную программу для выступлениях на соревнованиях.'
    },

]

export const Advantages = () => {
    return (
        <section className={styles.root}>
            {cards.map(card => {
                return <AdvantageCard key={card.key} heading={card.heading} description={card.description}>{card.child}</AdvantageCard>
            })}
        </section>
    )
}
