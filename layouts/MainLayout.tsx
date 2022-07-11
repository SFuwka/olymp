import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { Instagram } from '../assets/svg/Instagram'
import { Logo } from '../assets/svg/Logo'
import { Telegram } from '../assets/svg/Telegram'
import { Vk } from '../assets/svg/Vk'
import { useWindowSize } from '../hooks/windowSize'

import styles from './mainLayout.module.scss'

interface LayoutProps {
    title?: string
    description?: string
    children: React.ReactNode
    header?: JSX.Element
}

export const MainLayout = ({ children, header, title = 'add title for SEO', description = 'add description for SEO' }: LayoutProps) => {
    const windowWidth = useWindowSize()[0]
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <meta charSet='utf-8' />
            </Head>

            <nav className={styles.nav}>
                <div className={styles.navContainer}>
                    <div className={styles.logo}><Link href={'/'}><a><Logo color='#fff' /></a></Link></div>
                    <div className={styles.navLinks}>
                        <div>
                            <Link href={'/#coaches'}><a>тренеры</a></Link>
                            <Link href={'/#schedule'}><a>расписание</a></Link>
                            <Link href={'/#prices'}><a>цены</a></Link>
                            <Link href={'/#competitions'}><a>соревнования и сборы</a></Link>
                        </div>
                        <div className={styles.socialAndPhones}>
                            <div className={styles.social}>
                                <Link href={'#'}><a><Vk width={30} height={30} /></a></Link>
                                <Link href={'#'}><a><Instagram width={30} height={30} /></a></Link>
                                <Link href={'#'}><a><Telegram /></a></Link>
                            </div>
                            <div className={styles.phones}>
                                <Link href="tel:+79516667113"><a>+7 (951) 666 71 13</a></Link>
                                <Link href="tel:+79817318152"><a>+7 (981) 731 81 52</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {header && <header>{header}</header>}
            <main>
                {children}
            </main>
            <footer>

            </footer>
        </>
    )
}
