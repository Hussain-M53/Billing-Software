'use client';

import { FormEvent, useEffect, useContext, useState, ChangeEvent } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import { fetch_meter, fetch_floor, update_space, fetch_space } from "@/utils/space";


const Page = (params: any) => {
    const { user } = useContext(AuthContext);
    const [floors, setFloors] = useState([] as any);
    const [meters, setMeters] = useState([] as any);
    const [data, setData] = useState({

    } as any);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await update_space(user.token, user.user.id, data);
        if (response?.status == 200) {
            alert(response?.message?.message);
            router.push('/Space');
        } else {
            alert(response?.message);
        }

    }

    useEffect(() => {
        const fetch_meters = async () => {
            const data = await fetch_meter(user.token, user.user.id);
            if (data?.status == 200) {
                console.log(data)
                setMeters(data?.message.meters);
            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
        }

        const fetch_floors = async () => {
            const response = await fetch_floor(user.token, user.user.id);
            if (response?.status == 200) {
                console.log(response)
                setFloors(response?.message?.floors);
            } else {
                alert(response?.message);
                router.push('/Meter');
            }
        }
        fetch_floors();
        fetch_meters();
    }, [])

    useEffect(() => {
        const fetch_data = async () => {
            const data = await fetch_space(user.token, user.user.id, params.searchParams.id);
            if (data?.status == 200) {
                console.log(data)
                setData(data?.message.space);
            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
        }
        fetch_data();
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prevData: any) => ({
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
                            placeholder="Enter space name"
                            defaultValue={data?.name}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Space Type
                    </label>
                    <div className="mt-2">
                        <select
                            id="type"
                            name="type"
                            placeholder="Select Space type"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option disabled selected style={{ display: 'none' }} className='text-gray-300' >{data?.type}</option>
                            <option>Shop</option>
                            <option>Office</option>
                            <option>Appartment</option>
                            <option>PentHouse</option>
                            <option>Kiosk</option>
                            <option>CommonArea</option>
                            <option>Miscelleneous</option>
                        </select>
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
                            onChange={(e) => handleChange(e)}
                            defaultValue={data?.description}
                            placeholder="Enter description"
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="floor" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Floor
                    </label>
                    <div className="mt-2">
                        <select
                            id="floor"
                            name="floor"
                            placeholder="Floor ABC"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option selected style={{ display: 'none' }} value={data?.floor?.id} className='text-gray-300' >{data?.floor?.name}</option>
                            {floors?.map((floor: any, idx: number) => (
                                <option key={idx} value={floor?.id}>{floor?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

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
                            <option selected style={{ display: 'none' }} value={data?.meter?.id} className='text-gray-300' >{data?.meter?.name}</option>
                            {meters?.map((meter: any, idx: number) => (
                                <option key={idx} value={meter?.id}>{meter?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={'/Space'} className="text-sm font-semibold leading-6 text-gray-900">
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