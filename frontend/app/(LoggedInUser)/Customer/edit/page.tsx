'use client';

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import { fetch_space, update_customer, fetch_customer } from "@/utils/customer";
import Fetching from "@/app/_component/loading/fetching";

const Page = (params: any) => {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState({} as any);
    const router = useRouter();
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [spaces, setSpaces] = useState([] as any);

    useEffect(() => {
        const fetch_data = async () => {
            const data = await fetch_customer(user.token, user.user.id, params.searchParams.id);
            if (data?.status == 200) {
                setData({
                    ...data?.message.customer,
                    space: {
                        id : data?.message.customer.space.id,
                        name : data?.message.customer.space.name, 
                    },
                });

            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
        }
        const fetch = async () => {
            const data = await fetch_space(user.token, user.user.id);
            if (data?.status == 200) {
                setSpaces(data?.message.spaces);
            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
        }

        fetch_data();
        fetch();
        setIsLoadingData(false);
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const update = async () => {
            const response = await update_customer(user.token, user.user.id, data);
            if (response?.status == 201) {
                alert(response?.message?.message);
                router.push('/Customer');
            } else {
                alert(response?.message);
            }
        }
        update();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prevData: any) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };


    if (isLoadingData) {
        return (
            <Fetching />
        )
    }

    return (
        <form onSubmit={handleSubmit} className='m-auto w-3/5 p-10 bg-gray-100 rounded-md'>
            <div className="w-full mx-auto border-b border-gray-900/10 pb-8 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="CName" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="CName"
                            id="CName"
                            defaultValue={data?.CName}
                            autoComplete="name"
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter customer name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="Code" className="block text-sm font-medium leading-6 text-gray-900">
                        Code<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="Code"
                            id="Code"
                            defaultValue={data?.Code}
                            autoComplete="Code"
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter customer code"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-full">
                    <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="Email"
                            name="Email"
                            type="email"
                            autoComplete="email"
                            defaultValue={data?.Email}
                            placeholder="Enter your email"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="address"
                            id="address"
                            autoComplete="address"
                            defaultValue={data?.address}
                            placeholder="Enter your address"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="contact_person" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact Person
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="contact_person"
                            id="contact_person"
                            defaultValue={data?.ContactPerson}
                            autoComplete="contact_person"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact Number<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            min={0}
                            name="mobile"
                            id="mobile"
                            autoComplete="mobile"
                            defaultValue={data?.MobNo}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="space" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Space<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <select
                            id="space"
                            name="space"
                            autoComplete="space"
                            defaultValue={data?.space?.name}
                            onChange={(e) => handleChange(e)}
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {spaces?.map((space: any, idx: number) => (
                                <option key={idx} value={space.id}>{space.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Status<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <select
                            id="status"
                            name="status"
                            placeholder="Select Status"
                            defaultValue={data?.status}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={1}>Enabled</option>
                            <option value={0}>Disabled</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={'/Customer'} className="text-sm font-semibold leading-6 text-gray-900">
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