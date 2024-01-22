'use client';

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { fetch_roles, update_user } from "@/utils/user";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import Saving from "@/app/_component/loading/saving";
import Fetching from "@/app/_component/loading/fetching";

interface Role {
    id: string;
    name: string;
    description: string;
}

interface Data {
    roles: Role[];
}

const Page = (params: any) => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState<Data>({ roles: [] });
    const router = useRouter();
    const [isLoadingData,setIsLoadingData] = useState(true);
    const [userData, setUserData] = useState<{ [key: string]: string }>({
        id: params.searchParams.id,
        name: params.searchParams.name,
        username: params.searchParams.username,
        email: params.searchParams.email,
        role_id: params.searchParams.role_id,
        password: '',
        confirm_password: ''
    });
    const [save, setSave] = useState(false);

    useEffect(() => {
        const fetch_data = async () => {
            const data = await fetch_roles(user.token, user.user.id);
            if (data?.status == 200) {
                setData(data?.message);
                setIsLoadingData(false);
            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
        }

        fetch_data();
    }, [])

    const handleSubmit = (e: FormEvent) => {
        setSave(true)
        e.preventDefault();
        const update = async () => {
            const data = await update_user(user.token, user.user.id, userData);
            if (data!.status == 201) {
                alert(data?.message?.message);
                router.push('/User');
            } else {
                alert(data?.message);
            }
            setSave(false);
        }
        update();
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserData(prevData => ({
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
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={params.searchParams.name}
                            onChange={(e) => handleChange(e)}
                            autoComplete="given-name"
                            placeholder="Enter your name"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        User Name<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            defaultValue={params.searchParams.username}
                            placeholder="Enter username"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            defaultValue={params.searchParams.email}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Role<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <select
                            id="status"
                            name="role_id"
                            placeholder="Select Role"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option disabled selected style={{ display: 'none' }} className='text-gray-300' >{params.searchParams.role_name}</option>
                            {data.roles.map((role: Role, idx: number) => (
                                <option key={idx} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="password"
                            placeholder="Enter password"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
                        Confirm Password<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            autoComplete="password"
                            placeholder="Enter password again"
                            hidden
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={'/User'} className="text-sm font-semibold leading-6 text-gray-900">
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