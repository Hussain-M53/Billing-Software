'use client';

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { fetch_roles, create_user } from "@/utils/user";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";

const Page = () => {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetch_data = async () => {
            const data = await fetch_roles(user.token, user.user.id);
            if (data?.status == 200) {
                console.log(data)
                setData(data?.message);
            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
        }

        fetch_data();
    }, [])

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
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Meter
                    </label>
                    <div className="mt-2">
                        <select
                            id="status"
                            name="status"
                            placeholder="Select Status"
                            className="pl-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>Enabled</option>
                            <option>Disabled</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Document Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            placeholder="Enter customer code"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Date
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

                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Current Units (Ton Hours)
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            min={0}
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            placeholder="Enter customer code"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Final Units (Ton Hours)
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            min={0}
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            placeholder="Enter customer code"
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