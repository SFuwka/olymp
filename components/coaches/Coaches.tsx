import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './coaches.module.scss'
import 'swiper/css';
import { useWindowSize } from '../../helpFunctions/hooks/windowSize';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import clsx from 'clsx';
import { CoachCard } from './CoachCard';
import { useEffect, useState } from 'react';

const coaches = [
  {
    name: 'Евгения Игоревна',
    fullName: 'Евгения Игоревна Кузенкова',
    src: '/images/coaches/evgenia_small.webp',
    srcBIg: 'images/coaches/evgenia.webp',
    position: 'Старший тренер',
    positionDirection: `Старший тренер отделения по художественной гимнастике,
      Тренер групп начальной подготовки.
      Тренер групп спортивного совершенствования.`,
    id: 'evgeniya',
    info: [`Мастер спорта по художественной гимнастике`,
      `За спортивную карьеру была членом сборной 
      команды Санкт-Петербурга,
      многократным победителем и призером 
      чемпионатов Санкт-Петербурга и  международных соревнований.`, `Выпускница НГУ им.П.Ф.Лесгафта,
      специализация тренер - преподаватель 
      по художественной гимнастике.`, `Опыт работы с детьми 13 лет.`]
  },
  {
    name: 'Виктория Игоревна',
    fullName: 'Виктория Игоревна Леляк',
    src: '/images/coaches/viktoria_small.webp',
    srcBIg: 'images/coaches/viktoria.webp',
    position: 'Тренер',
    positionDirection: `Тренер групп спортивного совершенствования,
      Тренер групп начальной подготовки.`,
    id: 'viktoria',
    info: [`Мастер спорта России.`,
      `Стаж с 2009 года, 9 лет работы в СШОР пушкинского района. Тренер победителей и призеров международных, всероссийских и городских соревнований.`,
      `Высшее образование НГУ им. П.Ф. Лесгафта, кафедра теории и методики гимнастики, 2011 год.`,
      `В прошлом призер чемпионата и кубка по художественной гимнастике города Санкт-Петербурга.`]
  },
  {
    name: 'Екатерина Сергеевна',
    fullName: 'Екатерина Сергеевна Иванченкова',
    src: '/images/coaches/ekaterina_small.webp',
    srcBIg: 'images/coaches/ekaterina.webp',
    position: 'Тренер',
    id: 'ekaterina',
    positionDirection: `Тренер групп начальной подготовки.`,
    info: [`Мастер спорта России.`,
      `Образование - Высшее  НГУ им. П.Ф. Лесгафта, кафедра теории и методики гимнастики`,
      `За свою спортивную карьеру становилась призером чемпионатов и кубков по художественной гимнастике города Санкт-Петербурга.`]
  },
  {
    name: 'Карина Владимировна',
    fullName: 'Карина Владимировна Бигеева',
    src: '/images/coaches/karina_small.webp',
    srcBIg: 'images/coaches/karina.webp',
    position: 'Тренер',
    positionDirection: `Тренер групп начальной подготовки.`,
    id: 'karina',
    info: [`Кандидат В Мастера спорта России.`,
      `Образование - студентка 3-го курса НГУ им. П.Ф. Лесгафта, кафедра теории и методики гимнастики`,
      `Воспитанница нашего Клуба.`,
      `Является призёром всеросийских и международных соревнований.`]
  }
]

export const Coaches = () => {
  const windowWidth = useWindowSize()[0]
  const [activeCoach, setActiveCoach] = useState<typeof coaches[number]>(coaches[0])
  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    if (windowWidth >= 1000) setSlidesPerView(4)
    if (windowWidth < 1000) setSlidesPerView(3)
    if (windowWidth < 770) setSlidesPerView(2)
    if (windowWidth < 500) setSlidesPerView(1)
  }, [windowWidth])

  const handleSlidehange = (slideIndex: number) => {
    if (slidesPerView > 1) return
    setActiveCoach(coaches[slideIndex])
  }

  return (
    <section id='coaches' className={styles.root}>
      <h2>НАШИ ТРЕНЕРЫ</h2>
      <article>
        <Swiper
          onSlideChange={(swiper) => handleSlidehange(swiper.realIndex)}
          slidesPerView={slidesPerView}
          spaceBetween={40}
          loop={slidesPerView < 4}
          pagination={slidesPerView < 4 && {
            horizontalClass: styles.pagination,
            bulletClass: clsx('swiper-pagination-bullet', styles.bullet),
            bulletActiveClass: styles.activeBullet,
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination]}
        >
          {coaches.map(coach => {
            return <SwiperSlide key={coach.id}>
              <div className={clsx(styles.cardRoot, slidesPerView > 3 && styles.cursorOn4Slides)}>
                <img onClick={() => setActiveCoach(coach)} src={coach.src} alt={`Фото тренера: ${coach.name}`} />
                <h3>{coach.name}</h3>
              </div>
            </SwiperSlide>
          })}
        </Swiper>
        {activeCoach && <div id='CoachInfo' className={styles.coachCard}>
          <CoachCard
            fullName={activeCoach.fullName}
            position={activeCoach.position}
            positionDirection={activeCoach.positionDirection}
            info={activeCoach.info}
            src={activeCoach.srcBIg}
          ></CoachCard>
        </div>}
      </article>
    </section>
  )
}
