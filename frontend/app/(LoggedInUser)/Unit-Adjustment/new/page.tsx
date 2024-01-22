'use client';

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import { fetch_meter } from "@/utils/dashboard";
import { create_unitAdjustment } from "@/utils/unit_adjustment";

const Page = () => {

    const { user } = useContext(AuthContext);
    const [meters, setMeters] = useState([]);
    const [data, setData] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetch_meters = async () => {
            const data = await fetch_meter(user.token, user.user.id);
            if (data?.status == 200) {
                setMeters(data?.message.meters);
            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
        }
        fetch_meters();
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const create = async () => {
            const response = await create_unitAdjustment(user.token, user.user.id, data);
            if (response!.status == 201) {
                alert(response?.message?.message);
                router.push('/Unit-Adjustment');
            } else {
                alert(response?.message);
            }
        }
        create();
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };


    return (
        <form onSubmit={handleSubmit} className='m-auto w-3/5 p-10 bg-gray-100 rounded-md'>
            <div className="w-full mx-auto border-b border-gray-900/10 pb-8 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                <div className="sm:col-span-3">
                    <label htmlFor="meter" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Meter<span className="text-red-600">*</span>
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

                <div className="sm:col-span-3">
                    <label htmlFor="DocNo" className="block text-sm font-medium leading-6 text-gray-900">
                        Document Name<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="DocNo"
                            id="DocNo"
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter document name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="fromDate" className="block text-sm font-medium leading-6 text-gray-900">
                        From Date<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="date"
                            name="fromDate"
                            id="fromDate"
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter from date"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label htmlFor="toDate" className="block text-sm font-medium leading-6 text-gray-900">
                        To Date<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="date"
                            name="toDate"
                            id="toDate"
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter to date"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="currentUnits" className="block text-sm font-medium leading-6 text-gray-900">
                        Current Units (Kilo-Watt Hours)<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            min={0}
                            name="currentUnits"
                            id="currentUnits"
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter current units"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="finalUnits" className="block text-sm font-medium leading-6 text-gray-900">
                        Final Units (Kilo Watt-Hours)<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            min={0}
                            name="finalUnits"
                            id="finalUnits"
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter final units"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={'/Unit-Adjustment'} className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </Link>
                <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default Page;