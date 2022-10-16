import React from 'react'
import { Gallery } from './Gallery'

import {
    bootCampImages, bootCampImagesHighRes, competitionsImages, competitionsImagesHighRes,
    gymsMalayaImages, gymsMalayaImagesHighRes, gymsPolkImages, gymsPolkImagesHighRes, gymsTolImages, gymsTolImagesHighRes
} from './paths'
import styles from './galleries.module.scss'


export const Galleries = () => {
    return (
        <>
           <div className={styles.root}>
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
                    <Gallery slides={bootCampImages} highResSlides={bootCampImagesHighRes} />
                </section>
                <section id='gyms' className={styles.gymsRoot}>
                    <h2>наши залы</h2>
                    <h3>Малая улица, 9/3</h3>
                    <Gallery slides={gymsMalayaImages} highResSlides={gymsMalayaImagesHighRes} />
                    <h3>Бульвар Алексея Толстого 50/1</h3>
                    <Gallery slides={gymsTolImages} highResSlides={gymsTolImagesHighRes} />
                    <h3>Полковая 1/25</h3>
                    <Gallery showBullets={2} slides={gymsPolkImages} highResSlides={gymsPolkImagesHighRes} />
                </section>
           </div>
        </>
    )
}
