"use client"
import React from 'react'
import Card from '@/components/Card'
import Heading from '@/components/Heading'
import NavBar from '@/components/nav'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'

const Opportunities = () => {
  return (
    <>
    <SessionProvider>  <NavBar/></SessionProvider>
  
  <Heading/>

    <SessionProvider>
      <Provider store={store}> <Card /></Provider>
   
    </SessionProvider>
    </>
  
  )
}

export default Opportunities