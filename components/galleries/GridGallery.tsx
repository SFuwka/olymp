import React, { useState } from 'react'
import { Gallery, ThumbnailImageProps } from 'react-grid-gallery'
import { galleryImages, galleryImagesHighRes } from './paths'
import styles from './galleries.module.scss'
import { ModalWindow } from '../portals/ModalWindow'
import ZoomGallery from '../zoomGallery/ZoomGallery'
import { useWindowSize } from '../../helpFunctions/hooks/windowSize'

const LazyLoadImg = (props: ThumbnailImageProps) => {
    const { imageProps } = props
    return <img src={imageProps.src} alt={imageProps.alt} loading='lazy' style={imageProps.style} />
}



export const GridGallery = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const windowWidth = useWindowSize()[0]
    const [currentSlide, setCurrentSlide] = useState<number | null>(null)

    const openModal = (slideIndex: number) => {
        setCurrentSlide(slideIndex)
        setModalOpened(true)
    }
    const closeModal = (e: React.MouseEvent, force?: boolean) => {
        if (e.currentTarget === e.target) setModalOpened(false)
        if (force) setModalOpened(false)
    }
    return (
        <section id='gallery' className={styles.gridGalleryRoot}>
            <h2>Галерея</h2>
            <Gallery thumbnailImageComponent={LazyLoadImg} enableImageSelection={false} images={galleryImages} onClick={(index) => {
                openModal(index)
            }} />
            <ModalWindow open={modalOpened} handleClose={closeModal}>
                <ZoomGallery initialSlideIndex={currentSlide} slides={galleryImagesHighRes}
                    inModal={true} closeModal={closeModal} />
            </ModalWindow>
        </section>
    )
}
