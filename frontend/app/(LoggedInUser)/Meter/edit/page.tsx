'use client';

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { fetch_meterTables, update_meter, fetch_floor, fetch_meter } from "@/utils/meter";
import { AuthContext } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import Saving from "@/app/_component/loading/saving";
import Fetching from "@/app/_component/loading/fetching";

const Page = (params: any) => {
    const { user } = useContext(AuthContext);
    const [meterTables, setMeterTables] = useState([] as any);
    const [data, setData] = useState<any>({});
    const [save, setSave] = useState(false);
    const router = useRouter();
    const [isLoadingData, setIsLoadingData] = useState(true);


    useEffect(() => {
        const fetch_data = async () => {
            const data = await fetch_meter(user.token, user.user.id, params.searchParams.id);
            if (data?.status == 200) {
                console.log(data)
                setData(data?.message.meter);
            } else {
                alert(data?.message);
                router.push('/Meter');
            }
            setIsLoadingData(false);
        }

        fetch_data();
    }, [])


    useEffect(() => {
        const fetch_vacantMeterTables = async () => {
            const response = await fetch_meterTables(user.token, user.user.id);
            if (response?.status == 200) {
                console.log(response)
                setMeterTables(response?.message.meter_tables);
            } else {
                alert(response?.message);
                router.push('/Meter');
            }
        }

        fetch_vacantMeterTables();
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSave(true);
        const create = async () => {
            const response = await update_meter(user.token, user.user.id, data);
            if (response!.status == 201) {
                alert(response?.message?.message);
                router.push('/Meter');
            } else {
                alert(response?.message);
            }
            setSave(false);
        }
        create();
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
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            placeholder="Enter meter name"
                            defaultValue={data?.name}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Meter Type (To be implemented)
                    </label>
                    <div className="mt-2">
                        <select
                            id="type"
                            name="type"
                            placeholder="Select meter type"
                            defaultValue={data?.status}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option> Electrical Meter</option>
                            <option>BTU Meter </option>
                            <option>Gas Meter</option>
                            <option>Water Meter </option>

                        </select>
                    </div>
                </div>

                <div className="sm:col-span-full">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Description<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="description"
                            id="description"
                            autoComplete="description"
                            placeholder="Enter description of the meter..."
                            defaultValue={data?.description}
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
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

                <div className="sm:col-span-3">
                    <label htmlFor="meterTable" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Meter Table<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                        <select
                            id="meterTable"
                            name="meterTable"
                            onChange={(e) => handleChange(e)}
                            className="pl-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option selected>{data?.history_config?.TABLE_NAME}</option>
                            {meterTables?.map((meterTable: any, idx: number) => (
                                <option key={idx} value={meterTable?.id}>{meterTable?.table}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={'/Meter'} className="text-sm font-semibold leading-6 text-gray-900">
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