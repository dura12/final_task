import React from 'react'
const Heading = () => {
  return (
    <div className='grid gap-7 items-[left] m-10'>
    <div className='flex items-center justify-center'>
      <div className='flex flex-col md:flex-row justify-between items-center w-full lg:w-4/5'>
        <div className='flex flex-col mb-4 md:mb-0'>
          <h1 className='font-extrabold text-[2rem]'>Opportunities</h1>
          <p className='text-xl text-gray-400'>showing 73 results</p>
        </div>
        <div className='flex items-center'>
          <label className='font-normal text-lg text-gray-500 mr-2'>Sort by:</label>
          <select  className='p-2  w-36 rounded-lg bg-white'>
            <option value="default">Most Relevant</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
    </div>
  )
}




export default Heading