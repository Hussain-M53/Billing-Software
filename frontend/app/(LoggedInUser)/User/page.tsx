'use client';

import { AuthContext } from "@/app/_context/AuthContext";
import { fetch_user, delete_user } from "@/utils/user";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from 'react'
import Fetching from '@/app/_component/loading/fetching'
import Authorizing from '@/app/_component/loading/authorizing'


const Page = () => {
  const router = useRouter();
  const size = 7;
  const [activePage, setActivePage] = useState(1);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([] as any);
  const [isLoadingData, setIsLoadingData] = useState(false);


  const next = () => {
    setIsLoadingData(true);
    setActivePage(activePage + 1);
  };

  const prev = () => {
    setIsLoadingData(true);
    setActivePage(activePage - 1);
  };

  useEffect(() => {

    const fetch_data = async () => {
      const data = await fetch_user(user.token, user.user.id, { size, activePage, search });
      if (data?.status == 200) {
        setData(data!.message);
      } else {
        alert(data?.message);
        router.push('/Dashboard');
      }
      setIsAuthorizing(false);
      setIsLoadingData(false);
    }

    fetch_data();
  }, [search, activePage])


  const deleteUser = async (e: FormEvent, user_id: string) => {
    e.preventDefault();
    if (confirm("Are you sure, you want to delete?")) {
      const data = await delete_user(user.token, user.user.id, user_id);
      alert(data?.message?.message);
    }
  }

  if (isAuthorizing) {
    return (
      <Authorizing />
    )
  }

  if (isLoadingData) {
    return
    (
      <Fetching />
    )
  }

  return (
    <div className="container max-h-screen">
      <div className="flex justify-between items-center mx-auto  px-4 py-3.5 sm:px-6 lg:px-8 bg-white shadow ">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users</h1>
        <button className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold text-sm py-2 px-4 rounded">
          <Link href={'/User/new'}>
            Add User
          </Link>
        </button>
      </div>
      <div className="mx-10 mt-4">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for name,username or email here..." required />
          <button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md mx-10 my-4">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="sticky top-0 py-3 px-6 text-left ">Name</th>
              <th className="sticky top-0 py-3 px-6 text-left ">UserName</th>
              <th className="sticky top-0 py-3 px-6 text-center ">Email</th>
              <th className="sticky top-0 py-3 px-6 text-center ">Role</th>
              <th className="sticky top-0 py-3 px-6 text-center ">Edit</th>
              <th className="sticky top-0 py-3 px-6 text-center ">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data?.users.map((row: any, index: number) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{row?.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>{row?.username}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  {row?.email}
                </td>
                <td className="py-3 px-6 text-center">
                  {row?.role?.name}
                </td>

                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-4 mr-2 transform text-blue-500 hover:text-blue-300 hover:scale-110">
                      <Link href={{
                        pathname: 'User/edit',
                        query: {
                          id: row?.id,
                          name: row?.name,
                          username: row?.username,
                          email: row?.email,
                          role_id: row?.role.id,
                          role_name: row?.role.name,

                        }
                      }}><PencilIcon width={20} height={20} /></Link>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-4 mr-2 transform text-red-500 hover:text-red-300 hover:scale-110">
                      <button onClick={(e) => deleteUser(e, row?.id)}><TrashIcon width={20} height={20} /></button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mx-12 items-center justify-between">
        <div className='rounded-full px-4 py-2 bg-gray-600 text-white'>
          Showing {(data?.pagination.currentPage - 1) * size + 1} to {data?.pagination.totalItems - ((data?.pagination.currentPage - 1) * size) > size ? (data?.pagination.currentPage) * size : data?.pagination.totalItems} of {data?.pagination.totalItems} results
        </div>
        <div className="flex gap-x-2">
          <button
            className={`${activePage === 1 ? 'bg-gray-300 text-gray-100' : 'bg-gray-900 text-white hover:bg-gray-700'} flex items-center gap-2 py-2 px-4 rounded`}
            onClick={prev}
            disabled={activePage === 1}
          >
            Previous
          </button>
          <button
            className={`${activePage === data.pagination.totalPages ? 'bg-gray-300 text-gray-100' : 'bg-gray-900 text-white hover:bg-gray-700'} flex items-center gap-2 py-2 px-4 rounded`}
            onClick={next}
            disabled={activePage === data.pagination.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;  