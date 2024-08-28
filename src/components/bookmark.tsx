import { getSession } from 'next-auth/react';
import axios from 'axios';
async function bookmark(id: string) {
  const session = await getSession();
  try {
    const response = await axios.post(
      `https://akil-backend.onrender.com/bookmarks/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(`Error bookmarking id ${id}:`);
    throw error; 
  }
}

async function unBookmark(id: string) {
  const session = await getSession();
  try {
    const response = await axios.delete(`https://akil-backend.onrender.com/bookmarks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error unbookmarking id ${id}:`);
    throw error;
  }
}

export default async function toggleBookmark(id: string, isBookmarked: boolean) {
  const session = await getSession();
  if (!session?.accessToken) {
  alert("You must login first")
  }
  if  (!isBookmarked) {
    return bookmark(id);
  } else {
    return unBookmark(id);
  }
}
