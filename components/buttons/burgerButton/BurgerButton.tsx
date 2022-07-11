import React, { MouseEventHandler, useState } from "react"
import clsx from 'clsx';
import classes from './BurgerButton.module.scss'

interface BurgerButtonProps {
    onClick: MouseEventHandler
}

function BurgerButton({ onClick }: BurgerButtonProps) {

    const [active, setActive] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setActive(prev => !prev)
        onClick(e)
    }
    return (
        <div className={clsx(classes.container, active ? classes.change : '')} onClick={handleClick}>
            <div className={classes.bar1}></div>
            <div className={classes.bar2}></div>
            <div className={classes.bar3}></div>
        </div>
    )
}

export default BurgerButton