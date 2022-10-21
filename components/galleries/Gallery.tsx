import React, { useEffect, useState } from 'react'
import styles from './galleries.module.scss'
import { useWindowSize } from '../../helpFunctions/hooks/windowSize';
import ZoomGallery from '../zoomGallery/ZoomGallery';
import { ModalWindow as Modal } from '../portals/ModalWindow'
import 'swiper/css/pagination';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Lazy } from 'swiper';


type SlideType = {
  src: string
  alt?: string
  width?: number
  height?: number
  description?: string
}


interface IGallery {
  slides: SlideType[]
  highResSlides: SlideType[]
  showBullets?: 2 | 3 | 4
}

export const Gallery = ({ slides, highResSlides, showBullets = 4 }: IGallery) => {
  const windowWidth = useWindowSize()[0]
  const [currentSlide, setCurrentSlide] = useState<number | null>(null)
  const [modalOpened, setModalOpened] = useState(false)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [currentBullet, setCur] = useState<number>(1)
  let bulletClassName = (increment: number) => Math.abs((currentBullet + increment) % showBullets) === 1 ? styles.activeBullet : styles.bullet

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
    if (slides.length <= 3) setSlidesPerView(2)
    if (windowWidth < 500) setSlidesPerView(1)
  }, [windowWidth])
  return (
    <div className={styles.root}>
      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Lazy, Pagination]}
          lazy={true}
          grabCursor={true}
          loop={true}
          onSlideChangeTransitionEnd={(swiper) => {
            if (swiper.previousIndex > swiper.activeIndex) {
              return setCur(prev => prev -= 1)
            }
            return (setCur(prev => prev += 1))
          }}
          slidesPerView={slidesPerView}
          spaceBetween={20}>
          {slides.map((slide, i) => {
            return (
              <SwiperSlide key={i}>
                <div onClick={() => openModal(i)} >
                  <img loading='lazy' style={{ width: '100%', height: 'auto' }} className={styles.slide}

                    alt={slide.alt} src={slide.src} width={slide.width} height={slide.height}></img>
                  {slide.description && <p>{slide.description}</p>}
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className={styles.pagination}>
          <span className={bulletClassName(2)}></span>
          <span className={bulletClassName(1)}></span>
          {showBullets > 2 && <span className={bulletClassName(0)}></span>}
          {showBullets > 3 && < span className={bulletClassName(-1)}></span>}
        </div>
      </div>

      {
        slidesPerView > 1 ? <Modal open={modalOpened} handleClose={closeModal}>
          <ZoomGallery initialSlideIndex={currentSlide} slides={highResSlides}
            inModal={true} closeModal={closeModal} />
        </Modal> : ''
      }
    </div >
  )
}
