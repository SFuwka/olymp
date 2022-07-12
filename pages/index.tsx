import type { NextPage } from 'next'
import React from 'react'
import { ActionTop } from '../components/actionTop/ActionTop'
import { Divider } from '../components/divider/Divider'
import { Header } from '../components/header/Header'
import { ModalWindow } from '../components/modal/ModalWindow'
import { useWindowSize } from '../helpFunctions/hooks/windowSize'
import { MainLayout } from '../layouts/MainLayout'



const Home: NextPage = () => {
  const windowWidth = useWindowSize()[0]
  return (
    <React.StrictMode>
      <MainLayout title='Olymp | Home' description='Rhythmic gymnastics in Pusnik'>
        <Header />
        <Divider />
        {windowWidth < 750 && <ActionTop />}
      </MainLayout>
    </React.StrictMode>
  )
}

export default Home
