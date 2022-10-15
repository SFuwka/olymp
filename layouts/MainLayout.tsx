import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer/Footer'
import { Navigation } from '../components/navigation/Navigation'
import { useWindowSize } from '../helpFunctions/hooks/windowSize'


interface LayoutProps {
    title?: string
    description?: string
    children: React.ReactNode
    header?: JSX.Element
}

export const MainLayout = ({ children, title = 'add title for SEO', description = 'add description for SEO' }: LayoutProps) => {
    const windowWidth = useWindowSize()[0]
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta charSet='utf-8' />
            </Head>
            <Navigation />
            {children}
            <footer>
                <Footer />
            </footer>
        </>
    )
}
