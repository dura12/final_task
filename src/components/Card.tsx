'use client';
import { useGetAllJobsQuery } from '@/lib/services/opportunitiesService';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobPost } from './jobs';
import { useSession } from 'next-auth/react';
import { MdOutlineBookmark } from "react-icons/md"
import toggleBookmark from './bookmark';
import { BookMarked } from 'lucide-react';

const Card = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken || "";
  const { data: currentData, isSuccess, isError, isLoading } = useGetAllJobsQuery({ accessToken });
  const [users, setUsers] = useState<JobPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && currentData?.data) {
      setUsers(currentData.data);
    }
  }, [isSuccess, currentData]);

  if (isError) {
    return <div>Error While Fetching</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>No Data Found</div>;
  }

  const handleTitleClick = (id: string) => {
    router.push(`/description?id=${id}`);
  };

  const handleOnClickbookmark = async (id: string, bookmarked: boolean) => {
    if (status === "authenticated") {
      try {
        console.log(`Bookmark button clicked for id: ${id}, current state: ${bookmarked}`);
        const response = await toggleBookmark(id, bookmarked);
        if (response) {
          console.log(`Bookmark state toggled for id: ${id}, response: ${JSON.stringify(response)}`);
          setUsers(prevUsers =>
            prevUsers.map(user =>
              user.id === id ? { ...user, isBookmarked: !bookmarked } : user
            )
          );
          router.refresh();
        } else {
          console.log(`Failed to toggle bookmark for id: ${id}`);
        }
      } catch (error) {
        console.error("Error handling bookmark:", error);
      }
    }
  };

  return (
    <div className='flex flex-col w-[60%] ml-52 items-center justify-center'>
      {users.map((user) => (
        <div
          key={user.id}
          data-testid={`job-card-${user.id}`} 
          className="p-[24px] min-h-[266px] flex gap-3 hover:bg-gray-100 bg-white w-full  pt-8 pb-4 px-6 my-8 rounded-3xl drop-shadow-md border border-gray-300"
        >
          <img className='p-2 w-[70px] h-[70px]' src={user.logoUrl} alt={user.title} />
          <div>
            <h1 
              data-testid={`job-title-${user.id}`}
              onClick={() => handleTitleClick(user.id)} 
              className='font-bold pb-1 text-3xl cursor-pointer'
            >
              {user.title}
            </h1>
            <p className='text-gray-400 font-serif text-md pb-3'>{user.orgName}, {user.location.join(', ')}</p>
            <p className='text-[20px] text-gray-600 font-extralight'>{user.description}</p>
            <span className='absolute top-10 right-11'>
              <button 
              
                onClick={() => handleOnClickbookmark(user.id , user.isBookmarked)}
              >
                <MdOutlineBookmark   test-id = {user.id} size={30} color={user.isBookmarked ? "orange" : "gray"} />
              </button>
            </span>
            <div className='flex gap-2 mt-2'>
              <button className='m-2 p-2 w-auto bg-green-200 text-green-500 rounded-3xl'>In Person</button>
              <button className='m-2 p-2 w-32 bg-yellow-200 text-yellow-500 rounded-3xl'>Education</button>
              <button className='m-2 p-2 w-14 bg-blue-200 text-blue-500 rounded-3xl'>IT</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
