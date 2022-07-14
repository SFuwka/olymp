import styles from './groupsAndPrices.module.scss'

export interface GroupsAndPricesCardProps {
    children: React.ReactNode
    content: {
        key: string;
        head: string;
        body: string[];
    }[]
}



export const GroupsAndPricesCard = ({ children, content }: GroupsAndPricesCardProps) => {
    return (
        <article>
            {children}
            {content.map(content => {
                return <div key={content.key}>
                    <h3>{content.head}</h3>
                    {content.body.map((sentence, i) => {
                        return <p key={i}>{sentence}</p>
                    })}
                </div>
            })}
        </article>
    )
}
