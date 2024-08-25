
'use client'
import React from 'react'
import Description from '@/components/descrip'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SessionProvider } from 'next-auth/react'
const DescriptionPage = () => {
  return (
    <SessionProvider> <Provider store={store}><Description/></Provider></SessionProvider>
   
    
  )
}

export default DescriptionPage