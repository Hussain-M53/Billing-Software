'use client';

import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Link from "next/link";
import { update_floor } from "@/utils/floor";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";

const Page = (params: any) => {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState<{ [key: string]: string }>({
        id: params.searchParams.id,
        name: params.searchParams.name,
        description: params.searchParams.description,
    });
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const create = async () => {
            const response = await update_floor(user.token, user.user.id, data);
            if (response!.status == 200) {
                alert(response?.message?.message);
                router.push('/Floor');
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
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            placeholder="Enter floor name"
                            defaultValue={params.searchParams.name}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="description"
                            id="description"
                            autoComplete="description"
                            placeholder="Enter description"
                            defaultValue={params.searchParams.description}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={'/Floor'} className="text-sm font-semibold leading-6 text-gray-900">
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