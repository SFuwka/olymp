import React from 'react'

interface coachCardProps {
  info: string[]
}

export const CoachCard = ({ info }: coachCardProps) => {
  return (
    <>
      <div>{info}</div>
    </>
  )
}
