import React from 'react';
import { useGetContactFormApi } from "../src/api/contactusapi/useGetContactFormApi";
import { useDeleteContactFormApi } from "../src/api/contactusapi/useDeleteContactFormApi";
import { useQueryClient } from "react-query";

export const Admincontact = () => {
    const queryClient = useQueryClient();
    const { data: contacts, isLoading, isError } = useGetContactFormApi();
    const deleteContactMutation = useDeleteContactFormApi();

    const handleDelete = (contactId) => {
        deleteContactMutation.mutate(contactId, {
            onSuccess: () => queryClient.invalidateQueries('allcontacts'),
        });
    };

    if (isLoading) return <div className="flex items-center justify-center h-screen text-gray-700">Loading data...</div>;
    if (isError) return <div className="flex items-center justify-center h-screen text-red-500">Error occurred while fetching data.</div>;

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <h1 className="mb-6 text-3xl font-bold text-center text-red-600">Handle Contact</h1>
            {contacts && contacts.length > 0 && (
                <div className="w-full max-w-5xl p-4 mx-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full border border-collapse border-gray-400">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-400">Name</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-400">Email</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-400">Phone Num</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-400">Subject</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-400">Message</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {contacts.map(contact => (
                                <tr key={contact.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-400 whitespace-nowrap">{contact.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-400 whitespace-nowrap">{contact.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-400 whitespace-nowrap">{contact.phonenum}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-400 whitespace-nowrap">{contact.subject}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-400 whitespace-nowrap">{contact.message}</td>
                                    <td className="px-6 py-4 text-sm font-medium border border-gray-400 whitespace-nowrap">
                                    <button
  onClick={() => handleDelete(contact.id)}
  className="px-3 py-1 text-red-600 transition-colors duration-300 bg-transparent border border-red-600 rounded-md hover:text-red-900 hover:bg-red-50 hover:border-red-900"
>
  Delete
</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

