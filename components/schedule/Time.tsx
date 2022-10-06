import React from 'react'

interface ITime {
  time: string
}

export const Time = ({ time }: ITime) => {
  return (
    <p>{time.substring(0, 2)}<sup>{time.substring(2, 4)}</sup> - {time.substring(4, 6)}<sup>{time.substring(6, 8)}</sup></p>
  )
}
