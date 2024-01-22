'use client';

import { ChangeEvent, FormEvent, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import { previewData, create_billing, fetch_bill_template, fetch_billingDetails_template } from "@/utils/billing";

const Page = () => {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState([] as any);
    const router = useRouter();
    const [prevData, setPrevData] = useState([] as any);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const create = async () => {
            const response = await create_billing(user.token, user.user.id);
            if (response!.status == 201) {
                alert(response?.message?.message);
                router.push('/Billing');
            } else {
                alert(response?.message);
            }
        }
        create();
    }

    useEffect(() => {
        const fetchBills = async () => {
            const response = await fetch_bill_template(user.token, user.user.id);
            if (response?.status == 200) {
                console.log(response)
                setData(response?.message);
            } else {
                alert(response?.message);
            }
        }

        const fetchDetails = async () => {
            const response = await fetch_billingDetails_template(user.token, user.user.id);
            if (response?.status == 200) {
                console.log(response)
                setData((prevData: any) => ({
                    ...prevData,
                    billingDetails: response?.message.billingDetails
                }));
            } else {
                alert(response?.message);
            }
        }

        fetchBills();
        fetchDetails();

    }, [])

    const fetch_previewData = async (e: any) => {
        e.preventDefault();
        const response = await previewData(user.token, user.user.id, data.fromDate, data.toDate);
        if (response?.status == 200) {
            console.log(response)
            setPrevData(response?.message.previewData);
            setData((prevData: any) => ({
                ...prevData,
                previewData: response?.message.previewData
            }))
        } else {
            alert(response?.message);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prevData: any) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className='pt-4 flex w-full flex-col items-center max-h-screen overflow-y-auto'>
            <form onSubmit={handleSubmit} className='mx-auto w-11/12 mt-4 h-fit p-6 bg-gray-100 rounded-md'>
                <div className="w-full mx-auto border-b border-gray-900/10 pb-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-7">
                    <div className="sm:col-span-1">
                        <label htmlFor="DocDate" className="block text-sm font-medium leading-6 text-gray-900">
                            Billing-Month<span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="DocDate"
                                id="DocDate"
                                autoComplete="DocDate"
                                defaultValue={data?.dtBillingMonth}
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="DocNo" className="block text-sm font-medium leading-6 text-gray-900">
                            Doc No<span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="DocNo"
                                id="DocNo"
                                autoComplete="DocNo"
                                defaultValue={data?.DocNo}
                                onChange={(e) => handleChange(e)}
                                placeholder="E.g Sep-2020"
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="IssueDate" className="block text-sm font-medium leading-6 text-gray-900">
                            Issue Date<span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="IssueDate"
                                id="IssueDate"
                                defaultValue={data?.IssueDate}
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="DueDate" className="block text-sm font-medium leading-6 text-gray-900">
                            Due Date<span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="DueDate"
                                id="DueDate"
                                defaultValue={data?.DueDate}
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="RatePerTonHour" className="block text-sm font-medium leading-6 text-gray-900">
                            RATE PER KWH <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="RatePerTonHour"
                                id="RatePerTonHour"
                                defaultValue={data?.RatePerTonHour}
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
                            From Date<span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="fromDate"
                                defaultValue={data?.fromDate}
                                id="fromDate"
                                disabled={data?.fromDateDisabled}
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="toDate" className="block text-sm font-medium leading-6 text-gray-900">
                            To Date<span className="text-red-600">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="toDate"
                                defaultValue={data?.toDate}
                                id="toDate"
                                onChange={(e) => handleChange(e)}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-x-6">
                    <Link href={'/Billing'} className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    <button
                        onClick={(e) => fetch_previewData(e)}
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
            {prevData.length > 0 &&

                <div className="bg-white w-11/12 shadow-md rounded-xl my-4">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                <th className="py-2 px-2 text-left">Customer Name</th>
                                <th className="py-2 px-2 text-left">Code</th>
                                <th className="py-2 px-2 text-center">Prev.Reading</th>
                                <th className="py-2 px-2 text-center">Cur.Reading</th>
                                <th className="py-2 px-2 text-center">Units Consumed</th>
                                <th className="py-2 px-2 text-center">Others Charges</th>
                                <th className="py-2 px-2 text-center">Service Charges</th>
                                <th className="py-2 px-2 text-center">Arrears</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {prevData?.map((row: any, index: number) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-2 px-2 text-left">
                                        <span className="font-medium">{row?.CName}</span>
                                    </td>
                                    <td className="py-2 px-2 text-left">
                                        <span className="font-medium">{row?.Code}</span>
                                    </td>
                                    <td className="py-2 px-2 text-center">
                                        <span >{row?.PreviousReadingTonHour}</span>
                                    </td>
                                    <td className="py-2 px-2 text-center">
                                        <span >{row?.CurrentReadingTonHour}</span>
                                    </td>
                                    <td className="py-2 px-2 text-center">
                                        <span >{row?.UnitsConsumedTonHour}</span>
                                    </td>
                                    <td className="py-2 px-2 text-center">
                                        <input
                                            type="text"
                                            name="OthersText"
                                            id="OthersText"
                                            onChange={(e) => handleChange(e)}
                                            autoComplete="OthersText"
                                            placeholder="Enter charges type"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <input
                                            type="number"
                                            name="OthersCharges"
                                            id="OthersCharges"
                                            onChange={(e) => handleChange(e)}
                                            min={0}
                                            autoComplete="OthersCharges"
                                            placeholder="Enter charges amount"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </td>

                                    <td className="py-2 px-2 text-center">
                                        <input
                                            type="text"
                                            name="ServiceText"
                                            id="ServiceText"
                                            onChange={(e) => handleChange(e)}
                                            autoComplete="ServiceText"
                                            placeholder="Enter service type"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <input
                                            type="number"
                                            name="ServiceCharges"
                                            id="ServiceCharges"
                                            onChange={(e) => handleChange(e)}
                                            min={0}
                                            autoComplete="ServiceCharges"
                                            placeholder="Enter service amount"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </td>

                                    <td className="py-2 px-2 text-center">
                                        <input
                                            type="text"
                                            name="ArrearsText"
                                            id="ArrearsText"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="Enter arrears type"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <input
                                            type="number"
                                            name="ServiceCharges"
                                            id="ServiceCharges"
                                            onChange={(e) => handleChange(e)}
                                            min={0}
                                            placeholder="Enter arrears charges"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Page;