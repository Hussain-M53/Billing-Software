'use client';

import { MyLineChart } from "../../_component/_charts/lineChart";
import { BarChart } from "../../_component/_charts/barChart";
import { AreaChart } from "../../_component/_charts/areaChart";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  const userNavigation = [
    { name: 'Your Profile', href: '/Company' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/' },
  ]

  const signOut = (e: FormEvent) => {
    e.preventDefault()
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    router.push('/');
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
                      (<button onClick={(e) => signOut(e)} className={`${active ? 'bg-gray-100' : ''
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
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Select Meter
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>
          <div className="w-64">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              From Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                placeholder="Enter customer code"
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="w-64">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              To Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                placeholder="Enter customer code"
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto py-6 sm:px-6 lg:px-8">
          <div className='h-[300px] w-full'>
            <MyLineChart />
          </div>
          <div className='w-2/3'>
            <BarChart />
          </div>
          <div className='w-2/3'>
            <AreaChart />
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage;  