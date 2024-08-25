'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname , useRouter } from 'next/navigation'; 

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname(); 
const router = useRouter()
  const handleSavedJob = () => {
    if (status === 'authenticated') {
      router.push('/bookmarks');
    } else {
      alert('You must log in first');
    }
  };

  const handleAuth = async () => {
    if (status === 'authenticated') {
      try {
        await signOut({ redirect: false });
        router.push('/auth/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <nav className="flex float-right bg-white border-gray-200 text-2xl dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-5 p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/posts"
                className={`block py-2 px-3 rounded  md:border-0 md:p-0 ${pathname === '/posts' ? 'text-orange-500' : 'text-black'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                test-id="savedjob"
                onClick={handleSavedJob}
                className={`block py-2 px-3 rounded cursor-pointer md:border-0 md:p-0 ${pathname === '/bookmarks' ? 'text-orange-500' : 'text-black'}`}
              >
                Saved Jobs
              </button>
            </li>
            <li>
              <button
                test-id={status === 'authenticated' ? 'Logout' : 'Login'}
                onClick={handleAuth}
                className="block py-2 px-3 rounded cursor-pointe md:border-0 md:p-0 text-gray-900 dark:text-white"
              >
                {status === 'authenticated' ? 'Logout' : 'Login'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
