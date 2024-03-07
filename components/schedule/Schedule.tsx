import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import { ExpandMore } from '../../assets/svg/ExpandMore'
import { GroupTitle } from './GroupTitile'
import styles from './schedule.module.scss'
import { Time } from './Time'

const npGroups = [
  {
    id: 'np1',
    adress: 'г.Пушкин, центр',
    age: '4-7 лет',
    daysAndTime: [
      {
        day: 'Вторник',
        time: <Time time='18001930' />
      },
      {
        day: 'Среда',
        time: <Time time='18001930' />
      },
      {
        day: 'Пятница',
        time: <Time time='18001930' />
      }
    ],
    coach: 'Леляк В.И.',
    isRecruiting: 'идет набор'
  },
  {
    id: 'np2',
    adress: 'ул. Полковая 1/25',
    age: '3-6 лет',
    daysAndTime: [
      {
        day: 'понедельник',
        time: <Time time='18001845' />
      },
      {
        day: 'среда',
        time: <Time time='18001845' />
      }
    ],
    coach: 'Бигеева К.В.',
    isRecruiting: 'идет набор'
  },
  {
    id: 'np3',
    adress: 'г.Пушкин, центр',
    age: '3-6 лет',
    daysAndTime: [
      {
        day: 'вторник',
        time: <Time time='18001900' />
      },
      {
        day: 'четверг',
        time: <Time time='18001900' />
      }
    ],
    coach: 'Бигеева К.В.',
    isRecruiting: 'идет набор'
  },
  {
    id: 'np4',
    adress: 'г.Пушкин, центр',
    age: '5-9 лет',
    daysAndTime: [
      {
        day: 'понедельник',
        time: <Time time='18301930' />
      },
      {
        day: 'среда',
        time: <Time time='18301930' />
      }
    ],
    coach: 'Кузенкова Е.И.',
    isRecruiting: 'идет набор'
  },
  {
    id: 'np5',
    adress: 'г.Пушкин, центр',
    age: '3-5 лет',
    daysAndTime: [
      {
        day: 'вторник',
        time: <Time time='18001845' />
      },
      {
        day: 'четверг',
        time: <Time time='18001845' />
      }
    ],
    coach: 'Кузенкова Е.И.',
    isRecruiting: 'идет набор'
  },
  {
    id: 'np6',
    adress: 'Бул.Алексея Толстого 50/1',
    age: '3-6 лет',
    daysAndTime: [
      {
        day: 'вторник',
        time: <Time time='19302015' />
      },
      {
        day: 'Пятница',
        time: <Time time='18301915' />
      }
    ],
    coach: 'Иванченкова Е.С.',
    isRecruiting: 'идет набор'
  },
  {
    id: 'np7',
    adress: 'Бул.Алексея Толстого 50/1',
    age: '2-3 года',
    daysAndTime:[
      {
        day: 'вторник',
        time: <Time time='10001030' />
      },
      {
        day: 'Пятница',
        time: <Time time='10001030' />
      }
    ],
    coach: 'Кузенкова Е.И.',
    isRecruiting: 'идет набор'
  }
]

const utgGroups = [
  {
    id: 'utg1',
    adress: 'ул. Полковая 1/25',
    age: '6-10 лет',
    daysAndTime: [
      {
        day: 'понедельник',
        time: <Time time='19002030' />
      },
      {
        day: 'среда',
        time: <Time time='19002030' />
      }
    ],
    coach: 'Бигеева К.В.',
    isRecruiting: 'есть свободные места'
  },
  {
    id: 'utg2',
    adress: 'г.Пушкин, центр',
    age: '6-12 лет',
    daysAndTime: [
      {
        day: 'понедельник',
        time: <Time time='16301830' />
      },
      {
        day: 'среда',
        time: <Time time='16301830' />
      },
      {
        day: 'Пятница',
        time: <Time time='18001930' />
      }
    ],
    coach: 'Кузенкова Е.И.',
    isRecruiting: 'есть свободные места'
  },
  {
    id: 'utg3',
    adress: 'Бул.Алексея Толстого 50/1',
    age: '5-8 лет',
    daysAndTime: [
      {
        day: 'вторник',
        time: <Time time='18301930' />
      },
      {
        day: 'Пятница',
        time: <Time time='17301830' />
      }
    ],
    coach: 'Иванченкова Е.С.',
    isRecruiting: 'есть свободные места'
  },
]

const squadGroups = [
  {
    id: 'squad1',
    age: '2015 гр. и старше',
    coaches: ['Леляк В.И.', 'Кузенкова Е.И.'],
    adress: 'г.Пушкин, центр',
    info: [
      {
        day: 'понедельник',
        time: <Time time='16301930' />,
      },
      {
        day: 'вторник',
        time: <Time time='16301800' />,
        type: 'хореография',
        time2: <Time time='18001930' />
      },
      {
        day: 'четверг',
        time: <Time time='16301930' />,
      },
      {
        day: 'пятница',
        time: <Time time='16301800' />,
        type: `хореография`,
        time2: <Time time='18001930' />
      },
    ]
  },
  {
    id: 'squad2',
    age: '2011 гр. и младше',
    adress: 'г.Пушкин, центр',
    coaches: ['Кузенкова Е.И.', 'Леляк В.И.'],
    info: [
      {
        day: 'Понедельник',
        time: <Time time='16301830' />,
      },
      {
        day: 'среда',
        time: <Time time='16301830' />,
      },
      {
        day: 'пятница',
        time: <Time time='18001930' />,
        type: 'хореография',
        time2: <Time time='16301800' />

      },
    ]
  },
]

interface IGroupScheduleCard {
  i: number
  length: number
  group: {
    id: string;
    adress: string;
    age: string;
    daysAndTime: {
      day: string;
      time: JSX.Element;
    }[];
    coach: string;
    isRecruiting: string;
  }
}

export const GroupScheduleCard = ({ i, group, length }: IGroupScheduleCard) => {
  return (
    <label className={styles.accordion} htmlFor={group.id}>
      <input id={group.id} type="checkbox" />
      <div className={clsx(styles.title, i === 0 || i === length - 1 ? i === 0 ? styles.firstLabel : styles.lastLabel : undefined)}>
        <GroupTitle adress={group.adress} age={group.age} coach={group.coach} />
      </div>
      <div className={styles.content}>
        {group.daysAndTime.map((dayAndTime, i) => {
          return <div key={i} className={styles.container}>
            <p>{dayAndTime.day}</p>
            <div>{dayAndTime.time}</div>
          </div>
        })}
      </div>
    </label>
  )
}


export const Schedule = () => {
  const [currentGroup, setCurrentGroup] = useState<string | null>('np')
  const scrollRef = useRef<HTMLElement | null>(null)

  const handleSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentGroup(e.currentTarget.name)
    scrollRef.current?.scrollIntoView()
  }

  return (
    <section id='schedule'>
      <h2>Расписание</h2>
      <div className={styles.chooseGroupButtons}>
        <button name='np' onClick={handleSelection}>начальная подготовка</button>
        <button name='utg' onClick={handleSelection}>учебно-тренировочные группы</button>
        <button name='squad' onClick={handleSelection}>сборные</button>
      </div>
      <article ref={scrollRef}>
        {currentGroup === 'np' && <div className={styles.groupsSubList}>
          <h3>начальная подготовка</h3>
          {npGroups.map((group, i) => {
            return <GroupScheduleCard key={group.id} i={i} length={npGroups.length} group={group} />
          })}
        </div>}
        {currentGroup === 'utg' && <div className={styles.groupsSubList}>
          <h3>Учебно - тренировочные группы</h3>
          {utgGroups.map((group, i) => {
            return <GroupScheduleCard key={group.id} length={utgGroups.length} i={i} group={group} />
          })}
        </div>}
        {currentGroup === 'squad' && <div className={styles.groupsSubList}>
          <h3>сборные группы</h3>
          {squadGroups.map((group, i) => {
            return <label key={group.id} className={styles.accordion} htmlFor={group.id}>
              <input id={group.id} type="checkbox" />
              <div className={clsx(styles.title, styles.squadTitile,
                i === 0 || i === squadGroups.length - 1 ? i === 0 ? styles.firstLabel : styles.lastLabel : undefined)}>
                <div>
                  <ExpandMore />
                  <p>{group.age}</p>
                  <p>{group.adress}</p>
                  {group.coaches.map((coach, i) => {
                    return <p key={i}>{coach}</p>
                  })}
                  <p>Индивидуальные занятия</p>
                </div>
              </div>
              <div className={styles.content}>
                {group.info.map((info, i) => {
                  return <div key={i} className={styles.squad}>
                    <div className={styles.squadDayAndTime}>
                      <p className={styles.day}>{info.day}</p>
                      <div>{info.time}</div>
                    </div>
                    {info.type && <p className={styles.coreography}>{info.type} {info.time2}</p>}
                  </div>
                })}
              </div>
            </label>
          })}
        </div>}
      </article>
    </section>
  )
}
