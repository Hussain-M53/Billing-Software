import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Page = () => {
    const dummyRows = [
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },
        { name: "Lindsay Walton", floor: "Floor15", meterTable: "MBTU-JS5283", status: "Enabled" },

    ];
    return (
        <div className="container max-h-screen">
            <div className="flex justify-between items-center mx-auto  px-4 py-3.5 sm:px-6 lg:px-8 bg-white shadow ">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Spaces</h1>
                <button className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold text-sm py-2 px-4 rounded">
                    <Link href={'/Space/new'}>
                        Add Space
                    </Link>
                </button>
            </div>
            <div className="bg-white shadow-md rounded-xl m-10 max-h-[400px] overflow-y-auto">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="sticky top-0 py-3 px-6 text-left bg-gray-200">Name</th>
                            <th className="sticky top-0 py-3 px-6 text-left bg-gray-200">Floor</th>
                            <th className="sticky top-0 py-3 px-6 text-center bg-gray-200">Meter</th>
                            <th className="sticky top-0 py-3 px-6 text-center bg-gray-200">Status</th>
                            <th className="sticky top-0 py-3 px-6 text-center bg-gray-200 z-10">Edit</th>
                            <th className="sticky top-0 py-3 px-6 text-center bg-gray-200 z-10">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {dummyRows.map((row, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{row.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>{row.floor}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {row.meterTable}
                                </td>
                                <td className='py-3 px-6 text-center'>
                                    <div className={`${row.status == 'Enabled' ? 'bg-green-500' : 'bg-red-500'} py-1 rounded text-white`}>
                                        {row.status}
                                    </div>
                                </td>

                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <div className="w-4 mr-2 transform text-blue-500 hover:text-blue-300 hover:scale-110">
                                            <button><PencilIcon width={20} height={20} /></button>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <div className="w-4 mr-2 transform text-red-500 hover:text-red-300 hover:scale-110">
                                            <button><TrashIcon width={20} height={20} /></button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Page;
//Name,Floor,MeterTable,Status,Edit,Delete
//Name,Description,Floor,MeterTable,Status