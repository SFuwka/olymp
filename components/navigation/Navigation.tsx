import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Instagram } from '../../assets/svg/InstagramIcon'
import { Logo } from '../../assets/svg/LogoSvg'
import { Telegram } from '../../assets/svg/TelegramSvg'
import { Vk } from '../../assets/svg/VkSvg'
import { useWindowSize } from '../../helpFunctions/hooks/windowSize'
import BurgerButton from '../buttons/burgerButton/BurgerButton'
import styles from './navigation.module.scss'

const linksJsx = [
    <Link key='coachesNav' href={'/#coaches'}><a>тренеры</a></Link>,
    <Link key='scheduleNav' href={'/#schedule'}><a>расписание</a></Link>,
    <Link key='pricesNav' href={'/#prices'}><a>цены</a></Link>,
    <Link key='competitionsNav' href={'/#competitions'}><a>соревнования и сборы</a></Link>,
    <Link key='galleryNav' href={'/#gallery'}><a>галерея</a></Link>,
]

export const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const windowWidth = useWindowSize()[0]
    const handleBurgerClick = () => {
        setMenuOpen(prev => !prev)
    }
    useEffect(() => {
        if (windowWidth > 500 && menuOpen) setMenuOpen(false)
    }, [windowWidth, menuOpen])

    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                {windowWidth > 730 && <div className={styles.logo}><Logo color='#fff' /></div>}
                {windowWidth <= 560 && <BurgerButton onClick={handleBurgerClick} />}
                <div className={styles.navLinks}>
                    {windowWidth > 560 && <div>
                        {linksJsx.map((link) => {
                            return link
                        })}
                    </div>}
                    {<div className={clsx(styles.menu, menuOpen ? styles.menuOpen : styles.menuClosed)}>
                        <ul>
                            {linksJsx.map(link => {
                                return <li key={link.key}>{link}</li>
                            })}
                        </ul>
                    </div>}
                    <div className={styles.socialAndPhones}>
                        <div className={styles.social}>
                            <Link href={'https://vk.com/olymp_pushkin'}><a target='_blank'><Vk width={30} height={30} /></a></Link>
                            <Link href={'https://www.instagram.com/gymnastika_spb/'}><a target='_blank'><Instagram width={30} height={30} /></a></Link>
                            <Link href={'https://t.me/olymp_puskin'}><a target='_blank'><Telegram /></a></Link>
                        </div>
                        <div className={styles.phones}>
                            <a href="tel:+79516667113">+7 (951) 666 71 13</a>
                            <a href="tel:+79817318152">+7 (981) 731 81 52</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
