import clsx from 'clsx'
import { group } from 'console'
import React, { useRef, useState } from 'react'
import { ExpandMore } from '../../assets/svg/ExpandMore'
import { PlusIcon } from '../../assets/svg/PlusIcon'
import { GroupTitle } from './GroupTitile'
import styles from './schedule.module.scss'
import { Time } from './Time'

const npGroups = [
  {
    id: 'np1',
    adress: 'бул.Алексея Толстого 50/1',
    age: '3-6 лет',
    daysAndTime: [
      {
        day: 'понедельник',
        time: <Time time='17301815' />
      },
      {
        day: 'среда',
        time: <Time time='17301815' />
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
    adress: 'ул. Малая 9/3',
    age: '3-6 лет',
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
    coach: 'Бигеева К.В.',
    isRecruiting: 'идет набор'
  },
  {
    id: 'np4',
    adress: 'ул. Малая 9/3',
    age: '7-12 лет',
    daysAndTime: [
      {
        day: 'вторник',
        time: <Time time='16301800' />
      },
      {
        day: 'четверг',
        time: <Time time='16301800' />
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
        time: <Time time='17301815' />
      },
      {
        day: 'среда',
        time: <Time time='17301815' />
      }
    ],
    coach: 'Бигеева К.В.',
    isRecruiting: 'есть свободные места'
  },
  {
    id: 'utg2',
    adress: 'ул. Малая 9/3',
    age: '6-10 лет',
    daysAndTime: [
      {
        day: 'вторник',
        time: <Time time='16301830' />
      },
      {
        day: 'четверг',
        time: <Time time='16301830' />
      }
    ],
    coach: 'Кузенкова Е.И.',
    isRecruiting: 'есть свободные места'
  },
  {
    id: 'utg3',
    adress: 'ул. Малая 9/3',
    age: '5-8 лет',
    daysAndTime: [
      {
        day: 'вторник',
        time: <Time time='18002000' />
      },
      {
        day: 'четверг',
        time: <Time time='18002000' />
      },
      {
        day: 'суббота',
        time: <Time time='15001700' />
      }
    ],
    coach: 'Иванченкова Е.С.',
    isRecruiting: 'есть свободные места'
  },
]

const squadGroups = [
  {
    id: 'squad1',
    age: '2012 гр. и младше',
    coaches: ['Кузенкова Е.И.', 'Леляк В.И.'],
    info: [
      {
        day: 'понедельник',
        time: <Time time='18302030' />,
        adress: 'бул.Алексея Толстого 50/1'
      },
      {
        day: 'вторник',
        time: <Time time='16302000' />,
        adress: 'ул. Малая 9/3'
      },
      {
        day: 'четверг',
        time: <Time time='16302000' />,
        adress: 'ул. Малая 9/3'
      },
      {
        day: 'пятница',
        time: <Time time='18001900' />,
        adress: 'бул.Алексея Толстого 50/1',
        type: 'хореография',
        coach: 'Шустова Арина Борисовна'
      },
      {
        day: 'суббота',
        time: <Time time='15001800' />,
        adress: 'ул. Малая 9/3'
      }
    ]
  },
  {
    id: 'squad2',
    age: '2011 гр. и старше',
    coaches: ['Кузенкова Е.И.', 'Леляк В.И.'],
    info: [
      {
        day: 'вторник',
        time: <Time time='16302000' />,
        adress: 'ул. Малая 9/3'
      },
      {
        day: 'среда',
        time: <Time time='18302030' />,
        adress: 'бул.Алексея Толстого 50/1'
      },
      {
        day: 'четверг',
        time: <Time time='16302000' />,
        adress: 'ул. Малая 9/3'
      },
      {
        day: 'пятница',
        time: <Time time='19002030' />,
        adress: 'бул.Алексея Толстого 50/1',
        type: 'хореография',
        coach: 'Шустова Арина Борисовна'
      },
      {
        day: 'суббота',
        time: <Time time='15001800' />,
        adress: 'ул. Малая 9/3'
      }
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
              <div className={clsx(styles.title,styles.squadTitile,
                i === 0 || i === squadGroups.length - 1 ? i === 0 ? styles.firstLabel : styles.lastLabel : undefined)}>
                <div>
                  <ExpandMore />
                  <p>{group.age}</p>
                  {group.coaches.map((coach, i) => {
                    return <p key={i}>{coach}</p>
                  })}
                  <p>индивидуальные занятия</p>
                </div>
              </div>
              <div className={styles.content}>
                {group.info.map((info, i) => {
                  return <div key={i} className={styles.squad}>
                    <div className={styles.squadDayAndTime}>
                      <p className={styles.day}>{info.day}</p>
                      <div>{info.time}</div>
                    </div>
                    <p>{info.adress}</p>
                    {info.type && <p>{info.type}</p>}
                    {info.coach && <p>{info.coach}</p>}
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
