'use client';

import { MyLineChart } from "../../_component/_charts/lineChart";
import { BarChart } from "../../_component/_charts/barChart";
import { AreaChart } from "../../_component/_charts/areaChart";
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { fetch_meter, fetch_monthlyData } from "@/utils/dashboard";
import { AuthContext } from "@/app/_context/AuthContext";
import Fetching from "@/app/_component/loading/fetching";

const HomePage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [meters, setMeters] = useState([] as any);
  const [data, setData] = useState({} as any);
  const [chartData, setChartData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);


  const userNavigation = [
    { name: 'Your Profile', href: '/Company' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/' },
  ]

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    router.push('/');
  }

  useEffect(() => {
    const fetch_meters = async () => {
      const data = await fetch_meter(user.token, user.user.id);
      if (data?.status == 200) {
        setMeters(data?.message.meters);
        setIsLoading(false);

      }
      else if (data?.status == 401) {
        alert(data?.message);
        signOut();
      } else {
        alert(data?.message);
        router.push('/');
      }
    }
    fetch_meters();
  }, [])

  const getMonthlyData = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch_monthlyData(user.token, user.user.id, data);

    setChartData(response?.message.chartData)
    setIsLoading(false);

  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  if (isLoading) {
    return (
      <Fetching />
    )
  }

  return (
    <div className="h-screen w-full">
      <div className="mx-auto px-4 py-3.5 sm:px-6 lg:px-8 bg-white shadow flex justify-between items-center" >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <img
                className="w-8 h-8 hover:border-2 hover:border-red-700  rounded-full"
                src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                alt="hello"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute w-40 mt-2 right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    item.name == 'Sign out' ?
                      (<button onClick={(e) => signOut()} className={`${active ? 'bg-gray-100' : ''
                        } w-full text-left block px-4 py-2 text-sm text-gray-700`}>
                        {item.name}
                      </button>) : (
                        <Link
                          href={item.href}
                          className={`${active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                        >{item.name}
                        </Link>
                      )
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <main className="max-h-[550px] overflow-y-auto">
        <div className="m-4 flex justify-evenly items-center">
          <div className="w-64">
            <label htmlFor="meter" className="block text-sm font-medium leading-6 text-gray-900">
              Select Meters<span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <select

                id="meter"
                name="meter"
                autoComplete="meter"
                onChange={(e) => handleChange(e)}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {meters?.map((meter: any, idx: number) => (
                  <option key={idx} value={meter?.id}>{meter?.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-64">
            <label htmlFor="fromDate" className="block text-sm font-medium leading-6 text-gray-900">
              From Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="fromDate"
                id="fromDate"
                onChange={(e) => handleChange(e)}
                autoComplete="fromDate"
                placeholder="Enter Start Date"
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="w-64">
            <label htmlFor="toDate" className="block text-sm font-medium leading-6 text-gray-900">
              To Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="toDate"
                id="toDate"
                onChange={(e) => handleChange(e)}
                autoComplete="toDate"
                placeholder="Enter End Date"
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="m-4 flex justify-evenly items-center">
          <button className="w-64">
            <div className="hover:pointer-cursor text-center bg-blue-600 hover:bg-transparent border hover:border-blue-600 hover:text-blue-600 text-white font-semibold text-md py-2 px-3 rounded">
              Run Totalizer
            </div>
          </button>

          <button className="w-64" onClick={(e) => getMonthlyData(e)} disabled={isLoading}>
            <div className="hover:pointer-cursor text-center bg-blue-600 hover:bg-transparent border hover:border-blue-600 hover:text-blue-600 text-white font-semibold text-md py-2 px-3 rounded">
              <div className='flex justify-center items-center'>
                {isLoading && <svg className="animate-spin ml-1 mr-3 h-6 w-6 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
                </svg>}
                <span className="text-center">Monthly Line Graph</span>
              </div>

            </div>
          </button>

          <button className="w-64">
            <div className="hover:pointer-cursor text-center bg-blue-600 hover:bg-transparent border hover:border-blue-600 hover:text-blue-600 text-white font-semibold text-md py-2 px-3 rounded">
              Daily Line Graph
            </div>
          </button>

          <button className="w-64">
            <div className="hover:pointer-cursor text-center bg-blue-600 hover:bg-transparent border hover:border-blue-600 hover:text-blue-600 text-white font-semibold text-md py-2 px-3 rounded">
              Hourly Line Graph
            </div>
          </button>

        </div>

        {
          chartData.length > 0 && (

            <div className="flex flex-col items-center py-7 sm:px-6 lg:px-8">
              <div className='w-2/3'>
                <MyLineChart rowData={chartData} />
              </div>
              <div className='w-2/3'>
                <BarChart />
              </div>
              <div className='w-2/3'>
                <AreaChart />
              </div>
            </div>
          )
        }
      </main>
    </div>
  )
}

export default HomePage;  