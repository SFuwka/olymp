import React from 'react'
import styles from './container.module.scss'

interface Icontainer {
    children: React.ReactNode
}

export const Container = ({ children }: Icontainer) => {
    return (
        <div className={styles.root}>{children}</div>
    )
}
