import Head from 'next/head'
import React from 'react'
import { Navigation } from '../components/navigation/Navigation'
import { useWindowSize } from '../helpFunctions/hooks/windowSize'

import styles from './mainLayout.module.scss'

interface LayoutProps {
    title?: string
    description?: string
    children: React.ReactNode
    header?: JSX.Element
}

export const MainLayout = ({ children,  title = 'add title for SEO', description = 'add description for SEO' }: LayoutProps) => {
    const windowWidth = useWindowSize()[0]
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <meta charSet='utf-8' />
            </Head>
            <Navigation />
            <div>
                {children}
            </div>
            <footer>

            </footer>
        </>
    )
}
