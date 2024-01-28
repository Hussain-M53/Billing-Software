'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/_context/AuthContext";
import { fetch_logs } from '../../../utils/activity_logs'
import Authorizing from "@/app/_component/loading/authorizing";
import Fetching from "@/app/_component/loading/fetching";

const Page = () => {
  const size = 7;
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([] as any);
  const [activePage, setActivePage] = useState(1);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
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
      const data = await fetch_logs(user.token, user.user.id, { size, activePage, search });
      if (data?.status == 200) {
        console.log(data)
        setData(data?.message);
      } else {
        alert(data?.message);
        router.push('/Dashboard');
      }
      setIsAuthorizing(false);
      setIsLoadingData(false);
    }

    fetch_data();
  }, [search, activePage])

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };


  if (isAuthorizing) {
    return (
      <Authorizing />
    )
  }

  if (isLoadingData) {
    return (
      <Fetching />
    )
  }

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-between items-center mx-auto  px-4 py-3.5 sm:px-6 lg:px-8 bg-white shadow ">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Activity Log</h1>
      </div>
      <div className="mx-10 mt-4">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for name,description or status here..." required />
          <button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-xl mx-10 my-4">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-600 text-gray-200 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Timestamp</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Log By</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data?.logs?.map((row: any, index: number) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{formatDate(row?.timestamp)}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{row?.op_type}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{row?.description}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{row?.user?.name}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mx-12 items-center justify-between">
        <div className='rounded-full px-4 py-2 bg-gray-600 text-white'>
          Showing {(data?.pagination?.currentPage - 1) * size + 1} to {data?.pagination?.totalItems - ((data?.pagination?.currentPage - 1) * size) > size ? (data?.pagination?.currentPage) * size : data?.pagination?.totalItems} of {data?.pagination?.totalItems} results
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
            className={`${activePage === data?.pagination?.totalPages ? 'bg-gray-300 text-gray-100' : 'bg-gray-900 text-white hover:bg-gray-700'} flex items-center gap-2 py-2 px-4 rounded`}
            onClick={next}
            disabled={activePage === data?.pagination?.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page;  