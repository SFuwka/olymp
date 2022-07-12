import React from 'react'
import { ActionTop } from '../actionTop/ActionTop'
import styles from './header.module.scss'
export const Header = () => {
    return (
        <>
            <div className={styles.container}>
                <ActionTop/>
            </div>
        </>
    )
}
