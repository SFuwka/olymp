import React, { useEffect, useState } from 'react'
import styles from './galleries.module.scss'
import { useWindowSize } from '../../helpFunctions/hooks/windowSize';
import ZoomGallery from '../zoomGallery/ZoomGallery';
import { ModalWindow as Modal } from '../portals/ModalWindow'
import "swiper/css/pagination";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination
} from 'swiper';
import { Lazy } from "swiper";

type SlideType = {
  url: string
  alt: string
  description?: string
}


interface IGallery {
  slides: SlideType[]
  highResSlides: SlideType[]
}

export const Gallery = ({ slides, highResSlides }: IGallery) => {
  const windowWidth = useWindowSize()[0]
  const [currentSlide, setCurrentSlide] = useState<number | null>(null)
  const [modalOpened, setModalOpened] = useState(false)
  const [slidesPerView, setSlidesPerView] = useState(1)

  const openModal = (slideIndex: number) => {
    if (slidesPerView === 1) return setModalOpened(false)
    setCurrentSlide(slideIndex)
    setModalOpened(true)
  }
  const closeModal = (e: React.MouseEvent, force?: boolean) => {
    if (e.currentTarget === e.target) setModalOpened(false)
    if (force) setModalOpened(false)
  }

  useEffect(() => {
    if (windowWidth >= 770) setSlidesPerView(3)
    if (windowWidth < 770) setSlidesPerView(2)
    if (windowWidth < 500) setSlidesPerView(1)
  }, [windowWidth])
  return (
    <div className={styles.root}>
      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Lazy, Pagination]}
          grabCursor={true}
          loop={true}
          pagination={{ clickable: true, el: styles.test }}
          slidesPerView={slidesPerView}
          spaceBetween={20}>
          {slides.map((slide, i) => {
            return (
              <SwiperSlide key={i}>
                <div onClick={() => openModal(i)} >
                  <img className={styles.slide}
                    style={{ width: '100%' }}
                    alt={slide.alt} src={slide.url}></img>
                  {slide.description && <p>{slide.description}</p>}
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      {slidesPerView > 1 ? <Modal open={modalOpened} handleClose={closeModal}>
        <ZoomGallery initialSlideIndex={currentSlide} slides={highResSlides}
          inModal={true} closeModal={closeModal} />
      </Modal> : ''}
    </div>
  )
}
