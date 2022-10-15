import type { NextPage } from 'next'
import React from 'react'
import { ActionTop } from '../components/actionTop/ActionTop'
import { Advantages } from '../components/advantages/Advantages'
import { Coaches } from '../components/coaches/Coaches'
import { Container } from '../components/container/Container'
import { Divider } from '../components/divider/Divider'
import { FAQ_root } from '../components/FAQ/FAQ_root'
import { Galleries } from '../components/galleries/Galleries'
import { GridGallery } from '../components/galleries/GridGallery'
import { GroupsAndPrices } from '../components/groupsAndPrices/GroupsAndPrices'
import { Header } from '../components/header/Header'
import { Notification } from '../components/portals/Notification'
import { Schedule } from '../components/schedule/Schedule'
import { useWindowSize } from '../helpFunctions/hooks/windowSize'
import { MainLayout } from '../layouts/MainLayout'



const Home: NextPage = () => {
  const windowWidth = useWindowSize()[0]


  return (
    <React.StrictMode>
      <MainLayout title='Olymp | Home' description='Rhythmic gymnastics in Pusnik'>
        <Header />
        <Divider />
        {windowWidth <= 750 && <ActionTop />}
        <main>
          <Container>
            <Advantages />
            <GroupsAndPrices />
            <Coaches />
            <Schedule />
            <FAQ_root />
            <Galleries />
            <GridGallery />
          </Container>
        </main>
        <Notification>
          <aside>
            <p>Успешно отправлено!</p>
          </aside>
        </Notification>
      </MainLayout>
    </React.StrictMode>
  )
}

export default Home
