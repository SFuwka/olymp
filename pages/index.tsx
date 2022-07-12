import type { NextPage } from 'next'
import React from 'react'
import { Divider } from '../components/divider/Divider'
import { Header } from '../components/header/Header'
import { ModalWindow } from '../components/modal/ModalWindow'
import { MainLayout } from '../layouts/MainLayout'



const Home: NextPage = () => {

  return (
    <React.StrictMode>
      <MainLayout title='Olymp | Home' description='Rhythmic gymnastics in Pusnik'>
        <Header/>
        <Divider />
      </MainLayout>
    </React.StrictMode>
  )
}

export default Home
