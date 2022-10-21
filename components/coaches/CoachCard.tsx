import React, { useEffect, useState } from 'react'
import styles from './coaches.module.scss'
import { CheckSvg } from '../../assets/svg/CheckSvg'
import { Loader } from '../../assets/animated/Loader'

interface coachCardProps {
  info: string[]
  fullName: string
  position: string
  positionDirection: string
  src: string
  width: number
  height: number
}

export const CoachCard = ({ fullName, position, positionDirection, info, src, width, height }: coachCardProps) => {
  const [imgLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageLoaded(true)
  }, [])

  useEffect(() => {
    return () => {
      setImageLoaded(false)
    }
  }, [src])

  return (
    <>
      <div className={styles.coachCardRoot}>
        <div className={styles.info}>
          <h4>{fullName}</h4>
          <h5>{positionDirection}</h5>
          <div>
            {info.map((sentence, i) => {
              return <div className={styles.sentence} key={i}>
                <div><CheckSvg /></div>
                <p>{sentence}</p>
              </div>
            })}
          </div>
        </div>
        <div className={styles.picture}>
          <img style={imgLoaded ? { width: '100%', height: 'auto' } : { display: 'none' }} width={width} height={height} onLoad={() => setImageLoaded(true)} src={src} alt="" />
          {!imgLoaded && <Loader width={650} minHeight={300} borderRadius={20} />}
        </div>
      </div>
    </>
  )
}
