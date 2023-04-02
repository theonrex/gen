import React from 'react'
import Head from 'next/head'
import Mint from '../components/Mint'
import Imgslide from '../components/imgslide'
import Roadmap from '../components/Roadmap'
import Navbar from '../components/Navbar';


const index = () => {
  return (
    <>
    <Head>
        <title>Greatdan AI</title>
        <meta name="Greatdan" content="Greatdan AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
    <Navbar />
    <Mint />
    <Imgslide />
    <Roadmap />
    </>
  )
}

export default index