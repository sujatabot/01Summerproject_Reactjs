import React, { useState } from 'react';
import { useGetRegistrationApi } from "../src/api/registrationApi/useGetRegistrationApi";
import { useDeleteRegistrationApi } from "../src/api/registrationApi/useDeleteRegistrationApi";
import { useQueryClient } from "react-query";

export const AdminRegister = () => {
    const queryClient = useQueryClient();
    const { data: registers, isLoading, isError } = useGetRegistrationApi();
    const deleteRegisterMutation = useDeleteRegistrationApi();

    const handleDelete = async (registerId) => {
        await deleteRegisterMutation.mutateAsync(registerId, {
            onSuccess: () => queryClient.invalidateQueries('allregisters'),
        });
    };

    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <div className="py-4 text-xl text-center">Loading data...</div>;
    if (isError) return <div className="py-4 text-xl text-center text-red-500">Error occurred while fetching data.</div>;

    const filteredRegisters = registers.filter(register =>
        register.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container p-4 mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-center text-red-600">Handle Register</h1>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {filteredRegisters.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-collapse border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border border-gray-300">Name</th>
                                <th className="px-4 py-2 border border-gray-300">Phone Number</th>
                                <th className="px-4 py-2 border border-gray-300">Email</th>
                                <th className="px-4 py-2 border border-gray-300">Current Address</th>
                                <th className="px-4 py-2 border border-gray-300">Age</th>
                                <th className="px-4 py-2 border border-gray-300">Gender</th>
                                <th className="px-4 py-2 border border-gray-300">Medical Condition</th>
                                <th className="px-4 py-2 border border-gray-300">Query</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegisters.map(register => (
                                <tr key={register.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300">{register.name}</td>
                                    <td className="px-4 py-2 border border-gray-300">{register.phonenumber}</td>
                                    <td className="px-4 py-2 border border-gray-300">{register.email}</td>
                                    <td className="px-4 py-2 border border-gray-300">{register.currentaddress}</td>
                                    <td className="px-4 py-2 border border-gray-300">{register.age}</td>
                                    <td className="px-4 py-2 border border-gray-300">{register.gender}</td>
                                    <td className="px-4 py-2 border border-gray-300">{register.medicalcondition}</td>
                                    <td className="px-4 py-2 border border-gray-300">{register.query}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="py-4 text-xl text-center">No records found.</div>
            )}
        </div>
    );
};
