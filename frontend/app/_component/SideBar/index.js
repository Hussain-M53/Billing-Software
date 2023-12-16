'use client';

import { useState, useContext, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { AuthContext } from '../../_context/AuthContext';

const navigation = [
    {
        name: 'Dashboard',
        href: '/Dashboard',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
    },

    {
        name: 'Roles',
        href: '/Role',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
    },
    {
        name: 'Users',
        href: '/User',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
    },
    {
        name: 'Floors',
        href: '/Floor',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>

    },
    {
        name: 'Meters',
        href: '/Meter',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
    },
    {
        name: 'Space',
        href: '/Space',
        icon:

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
    },
    {
        name: 'Customers',
        href: '/Customer',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
    },
    {
        name: 'Unit Adjustment',
        href: '/Unit-Adjustment',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
            </svg>
    },
    {
        name: 'Billing',
        href: '/Billing',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
    },
    {
        name: 'Activity Logs',
        href: '/Activity-Logs',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
    },

]

const index = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user } = useContext(AuthContext);

    return (
        <div className={` ${isSidebarOpen ? 'w-64' : 'w-20'} h-screen flex flex-col bg-gray-800 transition-width duration-300`}>
            <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
                {isSidebarOpen && (
                    <Image
                        src="/Logo.png"
                        alt="Your Company"
                        width={50}
                        height={50}
                    />)}
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? (
                        <ChevronLeftIcon className="block h-7 w-7 text-gray-400 rounded-md p-1 bg-gray-700 hover:bg-white hover:text-gray-700" />
                    ) : (
                        <ChevronRightIcon className="block h-7 w-7 text-gray-400 rounded-md p-1 bg-gray-700 hover:bg-white hover:text-gray-700" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <div className="mt-4 flex-1 px-2 space-y-1">
                {navigation.map((item, idx) => (
                    <div key={idx}>
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`${pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block px-3 py-1 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
                            aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'page' : undefined}
                        >
                            <div className='flex items-center justify-start'>
                                <div className="mr-2 h-8 w-8 rounded-md bg-gray-700 flex items-center justify-center">{item.icon}</div>
                                {isSidebarOpen ? item.name : null}
                            </div>
                        </Link>
                    </div>

                ))}
            </div>


            {/* User account */}
            {isSidebarOpen && (
                <>
                    <div className="flex-shrink-0 px-2 space-y-1">
                        <span className="group w-full rounded-md bg-gray-800 px-3.5 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex flex-col justify-center items-center">
                            <span className="text-white text-sm font-medium truncate">
                                {user?.user.name}
                            </span>
                            <span className="text-gray-400 text-sm truncate">
                                {user?.user.email}
                            </span>
                        </span>
                    </div>
                    <div className='py-2 mt-2 text-gray-300 text-xs text-center bg-gray-700' >
                        Developed By DigiLab.co
                    </div>
                </>
            )}
        </div >
    )
}

export default index