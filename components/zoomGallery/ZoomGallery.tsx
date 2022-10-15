import React, { useEffect, useState } from 'react'
import styles from './ZoomGallery.module.scss'
import { CloseIcon } from '../../assets/svg/CloseIcon';
import { NextIcon } from '../../assets/svg/NextIcon';
import clsx from 'clsx';
import { Loader } from '../../assets/animated/Loader';

interface ZoomGalleryProps {
    slides: { src: string, alt?: string }[]
    initialSlideIndex: number | null
    inModal?: boolean
    closeModal?: (e: React.MouseEvent, force?: boolean) => void
}

function ZoomGallery({ slides, initialSlideIndex, inModal, closeModal }: ZoomGalleryProps) {
    const [imgLoaded, setImageLoaded] = useState(false)
    const [currentSlide, setCurrentSlide] = useState<{ src: string, alt?: string } | null>(null)

    useEffect(() => {
        if (initialSlideIndex !== null) setCurrentSlide(slides[initialSlideIndex])
    }, [initialSlideIndex])

    useEffect(() => {
        setImageLoaded(true)
    }, [])

    useEffect(() => {
        return () => {
            setImageLoaded(false)
        }
    }, [currentSlide])

    const nextSlide = () => {
        setCurrentSlide(prev => {
            if (prev) {
                if (slides.indexOf(prev) === slides.length - 1) return slides[0]
                return slides[slides.indexOf(prev) + 1]
            }
            return prev
        })
    }

    const prevSlide = () => {
        setCurrentSlide(prev => {
            if (prev) {
                if (slides.indexOf(prev) === 0) return slides[slides.length - 1]
                return slides[slides.indexOf(prev) - 1]
            }
            return prev
        })
    }
    return (
        <div className={styles.root}>
            {inModal
                ? <div onClick={(e: React.MouseEvent) => {
                    if (closeModal) closeModal(e, true)
                }} className={styles.closeButton}>
                    <CloseIcon />
                </div>
                : ''}
            {currentSlide && <>
                <div className={styles.prevWrapper} onClick={() => prevSlide()}>
                    <div className={clsx(styles.prev, styles.nav)}>
                        <NextIcon />
                    </div>
                </div>
                <div className={styles.imgWrapper}>
                    <img style={imgLoaded ? {} : { display: 'none' }} onLoad={() => setImageLoaded(true)}
                        src={currentSlide.src} alt={currentSlide.alt} />
                    {!imgLoaded && <Loader width={'80vw'} minHeight={'90vh'} />}
                </div>
                <div className={styles.nextWrapper} onClick={() => nextSlide()}>
                    <div className={clsx(styles.next, styles.nav)}>
                        <NextIcon />
                    </div>
                </div>
            </>}
        </div>
    )
}

export default ZoomGallery
