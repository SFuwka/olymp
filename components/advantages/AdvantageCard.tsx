import styles from './advantages.module.scss'

interface advantageCardProps {
    children: React.ReactNode
    heading: string
    description: string
}

export const AdvantageCard = ({ children, heading, description }: advantageCardProps) => {
    return (
        <article className={styles.cardRoot}>
            <div>{children}</div>
            <h3>{heading}</h3>
            <p>{description}</p>
        </article>
    )
}
