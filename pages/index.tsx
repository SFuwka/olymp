import type { NextPage } from 'next'
import { ActionTop } from '../components/actionTop/ActionTop'
import { Header } from '../components/header/Header'
import { MainLayout } from '../layouts/MainLayout'



const Home: NextPage = () => {

  return (
    <MainLayout header={Header()} title='Olymp | Home' description='Rhythmic gymnastics in Pusnik'>

      <ActionTop />

    </MainLayout>
  )
}

export default Home
