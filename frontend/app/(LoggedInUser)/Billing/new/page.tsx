'use client';

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { fetch_roles, create_user } from "@/utils/user";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";

const Page = () => {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState([] as any);
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const create = async () => {
            const data = await create_user(user.token, user.user.id);
            if (data!.status == 201) {
                alert(data?.message?.message);
                router.push('/User');
            } else {
                alert(data?.message);
            }
        }
        create();
    }

    const previewData = () => {

    }


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prevData: any) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className = 'block'>
            <form onSubmit={handleSubmit} className='mx-auto mt-4 h-fit w-11/12 p-10 bg-gray-100 rounded-md'>
                <div className="w-full mx-auto border-b border-gray-900/10 pb-8 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-1">
                        <label htmlFor="month" className="block text-sm font-medium leading-6 text-gray-900">
                            Billing-Month
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="month"
                                id="month"
                                autoComplete="month"
                                onChange={(e) => handleChange(e)}
                                placeholder="E.g Sep-2020"
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="issueData" className="block text-sm font-medium leading-6 text-gray-900">
                            Issue Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="issueData"
                                id="issueData"
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">
                            Due Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="dueDate"
                                id="dueDate"
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="rate" className="block text-sm font-medium leading-6 text-gray-900">
                            RATE PER KWH
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="rater"
                                id="rate"
                                onChange={(e) => handleChange(e)}
                                min={0}
                                autoComplete="rate"
                                placeholder="Enter rate per unit"
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="fromDate" className="block text-sm font-medium leading-6 text-gray-900">
                            From Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="fromDate"
                                id="fromDate"
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="toDate" className="block text-sm font-medium leading-6 text-gray-900">
                            To Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="toDate"
                                id="toDate"
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link href={'/Billing'} className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Preview Data
                    </button>
                    <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Generate Bill
                    </button>
                </div>
            </form>
            <div className="bg-white shadow-md rounded-xl mx-2 my-4">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-2 px-2 text-left">Customer Name</th>
                            <th className="py-2 px-2 text-center">Space</th>
                            <th className="py-2 px-2 text-center">Meter</th>
                            <th className="py-2 px-2 text-center">Prev.Reading</th>
                            <th className="py-2 px-2 text-center">Cur.Reading</th>
                            <th className="py-2 px-2 text-center">Arrears</th>
                            <th className="py-2 px-2 text-center">Other Charges</th>
                            <th className="py-2 px-2 text-center">Services Charges</th>
                            <th className="py-2 px-2 text-center">Payable Amount</th>
                            <th className="py-2 px-2 text-center">Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {data?.map((row: any, index: number) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 px-2 text-left">
                                    <span className="font-medium">{row?.CName}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span>{row?.customer?.space?.name}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span>{row?.customer?.space?.meter?.name}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span >{row?.PreviousReadingTonHour}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span >{row?.CurrentReadingTonHour}</span>
                                </td>
                                <td className="py-2 px-2 text-center">
                                    <span >{row?.Arrears}</span>
                                </td>
                                <td className="py-2 px-2 text-center ">
                                    <span >{row?.OtherCharges}</span>
                                </td>
                                <td className="py-2 px-2 text-center ">
                                    <span >{row?.ServiceCharges}</span>
                                </td>
                                <td className="py-2 px-2 text-center ">
                                    <span className="font-medium">{row?.TotalAmount}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page;