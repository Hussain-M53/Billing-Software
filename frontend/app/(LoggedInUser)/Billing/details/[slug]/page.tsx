'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, FormEvent } from 'react'
import { AuthContext } from "@/app/_context/AuthContext";
import { fetch_billingsByCustomer, exportPdf, generate_pdf } from '../../../../../utils/billing'
import Authorizing from "@/app/_component/loading/authorizing";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";

const Page = (params: any) => {
    const router = useRouter();
    const size = 8;
    const [activePage, setActivePage] = useState(1);
    const [isAuthorizing, setIsAuthorizing] = useState(true);
    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([] as any);

    const startIndex = (activePage - 1) * size;
    const endIndex = activePage * size;

    const next = () => {
        if (activePage < Math.ceil(data?.billingDetailsWithHistory_[0]?.billingDetailsHistory?.length / size)) {
            setActivePage(activePage + 1);
        }
    };


    const prev = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    };

    useEffect(() => {
        const fetch_data = async () => {
            const data = await fetch_billingsByCustomer(user.token, user.user.id, params.searchParams.bill_id, params.searchParams.c_id);
            if (data?.status == 200) {
                console.log(data)
                setData(data?.message?.billing);
            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
            setIsAuthorizing(false);
        }

        fetch_data();
    }, [])

    const export_pdf = async (e: FormEvent, customer_id: String, bill_id: String) => {
        e.preventDefault();
        const response = await generate_pdf(user.token, user.user.id, bill_id, customer_id);
        if (response?.status == 200) {
            alert(response?.message?.message);
        } else {
            alert(response?.message?.message);
        }
    }

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return (date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear());
    };

    if (isAuthorizing) {
        return (
            <Authorizing />
        )
    }

    return (
        <div className="max-h-screen w-full">
            <div className="flex justify-start items-center mx-auto px-4 py-3.5 sm:px-6 lg:px-8 bg-white shadow ">
                <Link href={{
                    pathname: '/Billing/details',
                    query: {
                        id: data?.BillingId,
                    }
                }}>
                    <ArrowLeftCircleIcon width={40} height={40} />
                </Link>
                <h1 className="ml-96 pl-16 text-3xl font-bold tracking-tight text-gray-900">Billing Details</h1>
            </div>
            <div className="mx-10 mt-4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Billing Month here..." required />
                    <button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-xl mx-2 my-4">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-600 text-gray-200 text-sm leading-normal">
                            <th className="py-2 px-2 text-left">Month</th>
                            <th className="py-2 px-2 text-center">From Date</th>
                            <th className="py-2 px-2 text-center">To Date</th>
                            <th className="py-2 px-2 text-center">Rate per KWH</th>
                            <th className="py-2 px-2 text-center">Prev.Reading</th>
                            <th className="py-2 px-2 text-center">Cur.Reading</th>
                            <th className="py-2 px-2 text-center">Units Amount</th>
                            <th className="py-2 px-2 text-center">Arrears</th>
                            <th className="py-2 px-2 text-center">Other Charges</th>
                            <th className="py-2 px-2 text-center">Services Charges</th>
                            <th className="py-2 px-2 text-center">Payable Amount</th>
                            <th className="py-2 px-2 text-center">Export PDF</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {data?.billingDetailsWithHistory_[0]?.billingDetailsHistory?.slice(startIndex, endIndex).map((row: any, index: number) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 px-2 text-left">
                                    <span className="font-medium">{row?.DocNo}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span>{formatDate(row?.FromDate)}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span>{formatDate(row?.ToDate)}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span>{row?.RatePerTonHour}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span >{row?.PreviousReadingTonHour}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span >{row?.CurrentReadingTonHour}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span>{row?.Amount}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span >{row?.Arrears}</span>
                                </td>
                                <td className="py-2 px-2 text-center ">
                                    <span >{row?.OtherCharges}</span>
                                </td>
                                <td className="py-2 px-2 text-center ">
                                    <span>{row?.ServiceCharges}</span>
                                </td>
                                <td className="py-2 px-2 text-center ">
                                    <span className="font-medium">{row?.TotalAmount}</span>
                                </td>

                                <td className="py-2 px-2 text-center">
                                    <button onClick={(e) => export_pdf(e, row?.CID_web, row?.BillingId)} className="bg-red-500 hover:bg-transparent border hover:border-red-500 hover:text-red-500 text-white font-bold text-xs py-1 px-2 rounded">
                                        Export PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex mx-12 items-center justify-between">
                <div className='rounded-full px-4 py-2 bg-gray-600 text-white'>
                    Showing {startIndex + 1} to {endIndex} of {data?.billingDetailsWithHistory_[0]?.billingDetailsHistory?.length} results
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
                        className={`${activePage === Math.ceil(data?.billingDetailsWithHistory_[0]?.billingDetailsHistory?.length / size) ? 'bg-gray-300 text-gray-100' : 'bg-gray-900 text-white hover:bg-gray-700'} flex items-center gap-2 py-2 px-4 rounded`}
                        onClick={next}
                        disabled={activePage === Math.ceil(data?.billingDetailsWithHistory_[0]?.billingDetailsHistory?.length / size)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Page;



