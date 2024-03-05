import Link from 'next/link'
import { Instagram as InstagramIcon } from '../../assets/svg/InstagramIcon'
import { Telegram } from '../../assets/svg/TelegramSvg'
import { Vk } from '../../assets/svg/VkSvg'
import classes from './Footer.module.scss'
import { PdfIcon } from '../../assets/svg/PdfIcon'


function Footer() {

    return (
        <section id='footer'>
            <div className={classes.container}>
                <div className={classes.phones}>
                    <div>
                        <Link href='tel:+79516667113'>+7 (951) 666 71 13</Link>
                        <p>Евгения Игоревна</p>
                    </div>
                    <div>
                        <Link href='tel:+79817318152'>+7 (981) 731 81 52</Link>
                        <p>Виктория Игоревна</p>
                    </div>
                </div>
                <div className={classes.adress}>
                    <div>
                        <p >г. Пушкин</p>
                        <Link className={classes.link} rel='noreferrer' target='_blank' href='https://yandex.ru/maps/10884/pushkin/?from=mapframe&ll=30.382232%2C59.702416&mode=usermaps&source=mapframe&um=constructor%3A7eb3410eadc2ed59f61dedd9861ba0fa59851643a326e3f957f88df1999e7bf8&utm_source=mapframe&z=18'>
                            <a target={'_blank'}>ТРК Константиновский, ул. Полковая 1/25</a></Link>
                        <Link className={classes.link} rel='noreferrer' target='_blank' href='https://yandex.ru/maps/10884/pushkin/?from=mapframe&ll=30.415129%2C59.730934&source=mapframe&um=constructor%3A7eb3410eadc2ed59f61dedd9861ba0fa59851643a326e3f957f88df1999e7bf8&utm_source=mapframe&z=16.53'>
                            <a target={'_blank'} >Бульвар Алексея Толстого д.50 к.1.</a></Link>
                        <Link className={classes.link} rel='noreferrer' target='_blank' href='https://yandex.ru/maps/10884/pushkin/?from=mapframe&ll=30.399200%2C59.719977&mode=usermaps&source=mapframe&um=constructor%3A7eb3410eadc2ed59f61dedd9861ba0fa59851643a326e3f957f88df1999e7bf8&utm_source=mapframe&z=17.25'>
                            <a target={'_blank'} >Ул. малая 9/3 (ЦСП "Электра")</a></Link>
                    </div>
                </div>
                <div className={classes.socialButtons}>
                    <ul className={classes.list}>
                        <li>
                            <Link target='_blank' href='https://www.instagram.com/gymnastika_spb/' className={classes.socialButton}>
                                <a target={'_blank'}><InstagramIcon width={30} height={30} /></a>
                            </Link>
                        </li>
                        <li>
                            <Link target='_blank' href='https://vk.com/olymp_pushkin' className={classes.socialButton}>
                                <a target={'_blank'}><Vk width={30} height={30} /></a>
                            </Link>
                        </li>
                        <li>
                            <Link target='_blank' href='https://t.me/olymp_puskin' className={`${classes.socialButton} ${classes.telegram}`}>
                                <a target='_blank'> <Telegram /></a>
                            </Link>
                        </li>
                    </ul>
                    <div className={classes.universityRoot}>
                        <Link className={classes.universityPdf} target='_blank' href='documents/usc.pdf'>
                            <a target='_blank'><PdfIcon /></a>
                        </Link>
                        <p>ПОЛОЖВНИЕ ОБ УЧЕБНО СПОРТИВНОМ ЦЕНТРЕ АНО ВО "УНИВЕРСИТЕТ при МПП ЕврАзЭС"</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
