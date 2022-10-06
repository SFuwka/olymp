import styles from './Bootcamp.module.scss'
import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../../helpFunctions/hooks/windowSize';
import ZoomGallery from '../zoomGallery/ZoomGallery';
import { ModalWindow as Modal } from '../portals/ModalWindow'
import "swiper/css/pagination";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Pagination
} from 'swiper';

const bootCampImages = [ //before database setup
    { url: '/images/bootcamp/1.jpg', alt: 'test' },
    { url: '/images/bootcamp/3.jpg', alt: 'test' },
    { url: '/images/bootcamp/5.jpg', alt: 'test' },
]

const bootCampImagesHighRes = [ //before database setup
    { url: '/images/bootcamp/2.jpg', alt: 'test' },
    { url: '/images/bootcamp/4.jpg', alt: 'test' },
    { url: '/images/bootcamp/5.jpg', alt: 'test' },
]

SwiperCore.use([Pagination])
const slidesHeaders = ['Кросс, распрыжка и СФП', 'Тренировка и массаж', 'Ястребиное озеро', 'Наши сборы', '']



function Bootcamp() {
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
        <section id='bootcamp'>
            <div className={styles.root}>
                <h2 >Сборы</h2>
                <p> СК “Олимп” 2 раза в год проводит
                    сборы в Пушкине, Ленинградской
                    области, в других городах России
                    и за рубежом по желанию
                    и возможностям родителей.
                </p>
                <p> Мы стараемся совместить усердные
                    тренировки с новыми впечатлениями.</p>
                <div className={styles.sliderContainer}>
                    <Swiper
                        grabCursor={true}
                        loop={true}
                        pagination={{ 'clickable': true }}
                        slidesPerView={slidesPerView}
                        spaceBetween={20}>
                        {bootCampImages.map((img, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <div onClick={() => openModal(i)} >
                                        <img className={styles.slide}
                                            style={{ width: '100%' }}
                                            alt={img.alt} src={img.url}></img>
                                        <p>{slidesHeaders[i]}</p>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
            {slidesPerView > 1 ? <Modal open={modalOpened} handleClose={closeModal}>
                <ZoomGallery initialSlideIndex={currentSlide} slides={bootCampImagesHighRes}
                    inModal={true} closeModal={closeModal} />
            </Modal> : ''}
        </section >
    )
}

export default Bootcamp
