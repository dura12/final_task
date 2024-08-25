// 'use client';
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
    throw error; // rethrow to handle in the component
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
    throw error; // rethrow to handle in the component
  }
}

export default async function toggleBookmark(id: string, bookmarked: boolean) {
  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error('No access token found');
  }
  if (!bookmarked) {
    return bookmark(id);
  } else {
    return unBookmark(id);
  }
}
