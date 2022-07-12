import React from 'react'
import { useWindowSize } from '../../helpFunctions/hooks/windowSize'
import { ActionTop } from '../actionTop/ActionTop'
import styles from './header.module.scss'
export const Header = () => {
    const windowWidth = useWindowSize()[0]
    return (
        <>
            <div className={styles.container}>
                {windowWidth > 750 && <ActionTop />}
            </div>
        </>
    )
}
