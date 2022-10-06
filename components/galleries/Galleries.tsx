import React from 'react'
import { Gallery } from './Gallery'

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

const competitionsImages = [
    { url: '/images/competitions/5.webp', alt: 'test' },
    { url: '/images/competitions/6.webp', alt: 'test' },
    { url: '/images/competitions/1.jpg', alt: 'test' },
    { url: '/images/competitions/4.jpg', alt: 'test' },
    { url: '/images/competitions/3.jpg', alt: 'test' },
]
const competitionsImagesHighRes = [
    { url: '/images/competitions/5High.webp', alt: 'test' },
    { url: '/images/competitions/6High.webp', alt: 'test' },
    { url: '/images/competitions/1.jpg', alt: 'test' },
    { url: '/images/competitions/4.jpg', alt: 'test' },
    { url: '/images/competitions/3.jpg', alt: 'test' },
]


export const Galleries = () => {
    return (
        <>
            <section id='competitions'>
                <h2>соревнования</h2>
                <Gallery slides={competitionsImages} highResSlides={competitionsImagesHighRes} />
            </section>
            <section id='bootcamp'>
                <h2>сборы</h2>
                <p> СК “Олимп” 2 раза в год проводит
                    сборы в Пушкине, Ленинградской
                    области, в других городах России
                    и за рубежом по желанию
                    и возможностям родителей.
                </p>
                <p> Мы стараемся совместить усердные
                    тренировки с новыми впечатлениями.</p>
                <Gallery slides={bootCampImages} highResSlides={bootCampImagesHighRes}/>
            </section>
            <section id='gyms'>
                <h2>наши залы</h2>
            </section>
        </>
    )
}
