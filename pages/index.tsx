import type { NextPage } from 'next'
import React from 'react'
import { ActionTop } from '../components/actionTop/ActionTop'
import { Advantages } from '../components/advantages/Advantages'
import { Coaches } from '../components/coaches/Coaches'
import { Container } from '../components/container/Container'
import { Divider } from '../components/divider/Divider'
import { GroupsAndPrices } from '../components/groupsAndPrices/GroupsAndPrices'
import { Header } from '../components/header/Header'
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
            <Coaches/>
          </Container>
        </main>
      </MainLayout>
    </React.StrictMode>
  )
}

export default Home
