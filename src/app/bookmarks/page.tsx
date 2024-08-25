
import React from 'react'
import BookMarks from '@/components/bookmarkedpage'
import NavBar from '@/components/nav'
import Heading from '@/components/Heading'
import AuthProvider from '@/components/AuthProvider'
import { fetchJobs } from '@/components/fetchBookmarks'


const BookMarksPage = async () => {
  
  const data = await fetchJobs();
  console.log(data)

  return (
    <div>
      <AuthProvider> <NavBar/></AuthProvider>
      
       <Heading/>
      <AuthProvider>
        <BookMarks data={data} />
    </AuthProvider>
    </div>
   
  )
}

export default BookMarksPage