'use client';

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { fetch_roles, create_user } from "@/utils/user";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import Saving from "@/app/_component/loading/saving";
import Fetching from "@/app/_component/loading/fetching";
import { fetch_customer } from "@/utils/customer";


const Page = (params : any) => {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState<any>({});
    const router = useRouter();
    const [save, setSave] = useState(false);
    const [meters, setMeters] = useState([] as any);
    const [isLoadingData, setIsLoadingData] = useState(true);


    useEffect(() => {
        const fetch_data = async () => {
            const data = await fetch_customer(user.token, user.user.id, params.searchParams.id);
            if (data?.status == 200) {
                console.log(data)
                setData(data?.message.customer);
            } else {
                alert(data?.message);
                router.push('/Customer');
            }
            setIsLoadingData(false);
        }

        fetch_data();
    }, [])

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
        setSave(true);
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
        setData((prevData : any) => ({
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
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="CName"
                            id="CName"
                            autoComplete="CName"
                            placeholder="Enter customer name"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="Code" className="block text-sm font-medium leading-6 text-gray-900">
                        Code
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="Code"
                            id="Code"
                            autoComplete="Code"
                            placeholder="Enter customer code"
                            onChange={(e) => handleChange(e)}
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
                            autoComplete="Email"
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
                            onChange={(e) => handleChange(e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                        Mobile Number
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="mobile"
                            id="mobile"
                            autoComplete="number"
                            onChange={(e) => handleChange(e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="meter" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Meter
                    </label>
                    <div className="mt-2">
                        <select
                            id="meter"
                            name="meter"
                            autoComplete="meter"
                            onChange={(e) => handleChange(e)}
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option selected>{ }</option>
                            {meters?.map((meter: any, idx: number) => (
                                <option key={idx} value={meter?.id}>{meter?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Status
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
                            <option>Enabled</option>
                            <option>Disabled</option>
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
                    {(save) ? <Saving /> :
                        "Save"
                    }    </button>
            </div>
        </form>
    )
}

export default Page;