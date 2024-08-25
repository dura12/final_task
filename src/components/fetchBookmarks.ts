import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export async function fetchJobs() {
  const session = await getServerSession(options);
  const accessToken = session?.accessToken;

  try {
    const response = await fetch("https://akil-backend.onrender.com/bookmarks/", {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorDetails = await response.text(); 
      throw new Error(`Error: ${response.status} - ${errorDetails}`);
    }

    const data = await response.json(); 

    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error('Error fetching jobs:', err);
    return [];
  }
}
