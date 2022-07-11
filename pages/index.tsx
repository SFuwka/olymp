import type { NextPage } from 'next'
import { Header } from '../components/header/Header'
import { MainLayout } from '../layouts/MainLayout'



const Home: NextPage = () => {

  return (
    <MainLayout header={Header()} title='Olymp | Home' description='Rhythmic gymnastics in Pusnik'>

      <h1>content</h1>

    </MainLayout>
  )
}

export default Home
