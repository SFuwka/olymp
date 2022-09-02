import { CheckSvg } from '../../assets/svg/CheckSvg';
import styles from './groupsAndPrices.module.scss'

export interface GroupsAndPricesCardProps {
    children: React.ReactNode
    groupName: string
    content: {
        key: string;
        head: JSX.Element;
        body: string[];
    }[]
    haveButton?: boolean
}



export const GroupsAndPricesCard = ({ children, groupName, content, haveButton }: GroupsAndPricesCardProps) => {
    return (
        <article className={styles.cardRoot}>
            {children}
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
            {haveButton && <button>Пробное занятие - бесплатно.</button>}
        </article>
    )
}
