'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { EventData } from './jobs'; 


interface BookMarksProps {
  data: EventData[]; // Updated prop name here
}

const BookMarks = ({ data }: BookMarksProps) => { // Use `data` here
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [jobs, setJobs] = useState<EventData[]>(data); // Initialize with `data`
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
console.log(data)

  if (loading) return <div>Loading...</div>;
  else if (status === 'unauthenticated') return  <div className="flex justify-center items-center">
  <h1 className="text-3xl font-extrabold text-gray-900 pt-20">Please sign in to see your bookmarks.</h1>
</div>;
   if (error) return <div>{error}</div>;
    if  (data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-extrabold text-gray-900 pt-20">No Bookmarked Jobs</h1>
      </div>
    );
  }

  const handleTitleClick = (id: string) => {
    router.push(`/description?id=${id}`);
  };

  return (
    <div className='m-10 flex justify-center'>
      <div className="w-[75%]">
        {jobs.map((ele) => (
          <div
            key={ele.eventID}
            onClick={() => router.push(`/description?id=${ele.eventID}`)}
            className="p-[24px] min-h-[266px] flex gap-3 hover:bg-gray-100 bg-white max-w-[75] justify-items-center pt-8 pb-4 px-6 my-8 rounded-3xl drop-shadow-md border border-gray-300 cursor-pointer"
          >
            <img className='p-2 w-[70px] h-[70px]' src={ele.logoUrl} alt={ele.title} />
            <div>
              <h1 className='font-bold pb-1 text-3xl'
                onClick={() => handleTitleClick(ele.eventID)} 
              
              >{ele.title}</h1>
              <p className='text-gray-400 font-serif text-md pb-3'>{ele.orgName}, {ele.location}</p>
              <div className='flex gap-2 mt-2'>
              <button className='m-2 p-2 w-auto bg-green-200 text-green-500 rounded-3xl'>In Person</button>
              <button className='m-2 p-2 w-32 bg-yellow-200 text-yellow-500 rounded-3xl'>Education</button>
              <button className='m-2 p-2 w-14 bg-blue-200 text-blue-500 rounded-3xl'>IT</button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMarks;
