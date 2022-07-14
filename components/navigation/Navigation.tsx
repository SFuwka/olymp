import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Instagram } from '../../assets/svg/InstagramSvg'
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
                {windowWidth > 500 && <div className={styles.logo}><Link href={'/'}><a><Logo color='#fff' /></a></Link></div>}
                {windowWidth <= 500 && <BurgerButton onClick={handleBurgerClick} />}
                <div className={styles.navLinks}>
                    {windowWidth > 500 && <div>
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
                            <Link href={'#'}><a><Vk width={30} height={30} /></a></Link>
                            <Link href={'#'}><a><Instagram width={30} height={30} /></a></Link>
                            <Link href={'#'}><a><Telegram /></a></Link>
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
