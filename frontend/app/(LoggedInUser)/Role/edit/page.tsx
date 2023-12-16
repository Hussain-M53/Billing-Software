'use client';

import { FormEvent, ChangeEvent, useState, useContext, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/_context/AuthContext";
import { update_role, fetch_role } from '../../../../utils/role'
import { useRouter } from 'next/navigation'

interface Permission {
    name: string;
    uq_key: string;
    group_name: string;
    is_assigned: boolean;
}

const Page = (params: any) => {
    const groups = ['Floor', 'Meter', 'Customer', 'Space', 'Unit Adjustment', 'User', 'Role', 'Billing'];
    const permissions = ['View', 'Create', 'Update', 'Delete', 'Print'];
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [isLoadingData, setIsLoadingData] = useState(true);

    const initializePermissions = () => {
        const allPermissions: Permission[] = [];
        groups.forEach(group => {
            permissions.forEach(permission => {
                allPermissions.push({
                    name: `${permission} ${group}`,
                    uq_key: `${permission.toLowerCase()}_${group.toLowerCase()}`,
                    group_name: group,
                    is_assigned: false
                });
            });
        });
        return allPermissions;
    };

    const [role, setRole] = useState({
        id: params.searchParams.id,
        name: '',
        description: '',
        permissions: initializePermissions()
    });

    useEffect(() => {
        const fetch_data = async () => {
            const data = await fetch_role(user.token, user.user.id, params.searchParams.id);
            if (data?.status == 200) {
                console.log(data)
                setRole(prevData => ({
                    ...prevData,
                    name: data.message.role.name,
                    description: data.message.role.description,
                    permissions: data.message.role.permissions
                }))
            } else {
                alert(data?.message);
                router.push('/Dashboard');
            }
            setIsLoadingData(false);
        }

        fetch_data();
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value
        });
    }

    const handleCheckboxChange = (group: string, permission: string, isChecked: boolean) => {
        const updatedPermissions = role.permissions?.map(p => {
            if (p.group_name === group && p.name === `${permission} ${group}`) {
                return { ...p, is_assigned: isChecked };
            }
            return p;
        });

        setRole({
            ...role,
            permissions: updatedPermissions
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(role);
        const response = await update_role(user.token, user.user.id, role);
        if (response?.status == 201) {
            alert(response?.message?.message);
            router.push('/Role');
        } else {
            alert(response?.message);
        }
    }

    if (isLoadingData) return (
        <div className='h-screen mx-auto justify-center items-center flex'>
            <div>
                <svg className="animate-spin ml-1 mr-3 h-10 w-10 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
                </svg>
            </div>
            <div>
                loading data...
            </div>
        </div>);

    return (
        <form onSubmit={handleSubmit} className='max-h-screen m-auto w-3/5 p-6 bg-gray-100 rounded-md'>
            <div className="w-full mx-auto border-b border-gray-900/10 pb-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            placeholder="Enter name of the role"
                            value={role.name}
                            onChange={handleInputChange}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Enter role description"
                            value={role.description}
                            onChange={handleInputChange}
                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-full">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Permissions</th>
                                {permissions.map((permission, key) => (
                                    <th className="py-3 px-6 text-left" key={key}>{permission}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {groups.map((group, grpIdx) => (
                                <tr key={grpIdx} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-2 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="font-medium">{group}</span>
                                        </div>
                                    </td>
                                    {permissions.map((permission, perIdx) => (
                                        <td key={perIdx} className="py-2 px-6 text-left">
                                            <input
                                                id={`${permission}_${group}`}
                                                name={`${permission}_${group}`}
                                                type="checkbox"
                                                onChange={(e) => handleCheckboxChange(group, permission, e.target.checked)}
                                                checked={role.permissions?.find(p => p.group_name === group && p.name === `${permission} ${group}`)?.is_assigned}
                                                className="ml-4 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={"/Role"} className="text-sm font-semibold leading-6 text-gray-900">
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
