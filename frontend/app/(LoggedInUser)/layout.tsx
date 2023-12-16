'use client';

import SideBar from '../_component/SideBar'
import { AuthContext } from '../_context/AuthContext';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from "next/navigation"

export default function UserLayout({ children, }: { children: React.ReactNode }) {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data')!);
    const token = JSON.parse(localStorage.getItem('token')!);

    if (user == null) {
      router.push('/');
    } else {
      setIsLoading(false);
      setUser({
        token: token,
        user: user
      })
    }
  }, [])

  if (isLoading) return (
    <div className='h-screen justify-center items-center flex'>
      <div>
        <svg className="animate-spin ml-1 mr-3 h-10 w-10 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
        </svg>
      </div>
      <div>
        Authenticating...
      </div>
    </div>
  )

  return (
    <div className="flex w-full">
      <SideBar />
      {children}
    </div>
  )
}
