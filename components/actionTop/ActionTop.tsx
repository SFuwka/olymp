import Link from 'next/link'
import styles from './actionTop.module.scss'

export const ActionTop = () => {
    return (
        <article className={styles.root}>
            <div className={styles.wrapper}>
                <h1>ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА<br /><span>СК</span> <span>&quot;ОЛИМП&quot;</span><br /><span>г. Пушкин</span></h1>
                <div className={styles.adressLinks}>
                    <Link href="#"><a ><h3>Ул малая 9/3</h3></a></Link>
                    <Link href="#"><a ><h3>ТРК Константиновский, ул. Полковая 1/25</h3></a></Link>
                    <Link href="#"><a ><h3>Бульвар Алексея Толстого д.50 к.1.</h3></a></Link>
                </div>
               <div className={styles.actionCall}> <h3>Запишитесь на первое занятие совершенно <br /><span>БЕСПЛАТНО</span></h3></div>
            </div>
        </article>
    )
}
