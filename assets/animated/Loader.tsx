import { useEffect, useState } from 'react'
import styles from './loader.module.scss'

interface LoaderProps {
    width: number | string
    minHeight: number | string
    borderRadius?: number
}

export const Loader = ({ width, minHeight, borderRadius }: LoaderProps) => {
    const [show, setShow] = useState<boolean>(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true)
        }, 700);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            {!show && <div style={{ width: '100%', minHeight: 300 }}></div>}
            {show && <div className={styles.loader} style={{ width, minHeight, borderRadius }}>
                <div className={styles.ldsRipple}><div></div><div></div></div>
            </div>}
        </>
    )
}
