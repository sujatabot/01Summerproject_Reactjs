import React, { useState } from 'react';
import { useCheckInItem, useCheckOutItem } from '../../src/api/Inventoryapi/api2';
import { getItems } from '../../src/api/Inventoryapi/api';
import { useQuery } from 'react-query';
import * as z from 'zod';

const quantitySchema = z.number().positive().int();

const CheckInOut = () => {
  const { data: items, error, isLoading } = useQuery('items', getItems);
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const checkInMutation = useCheckInItem();
  const checkOutMutation = useCheckOutItem();

  const handleCheckIn = () => {
    const parsedQuantity = quantitySchema.safeParse(parseInt(quantity));
    if (parsedQuantity.success) {
      checkInMutation.mutate({ id: itemId, quantity: parsedQuantity.data });
      setErrorMessage(''); // Clear error message
    } else {
      setErrorMessage('Please enter a valid positive integer for quantity.');
    }
  };

  const handleCheckOut = () => {
    const parsedQuantity = quantitySchema.safeParse(parseInt(quantity));
    if (parsedQuantity.success) {
      checkOutMutation.mutate({ id: itemId, quantity: parsedQuantity.data });
      setErrorMessage(''); // Clear error message
    } else {
      setErrorMessage('Please enter a valid positive integer for quantity.');
    }
  };

  const filteredItems = items?.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = filteredItems?.sort((a, b) => a.id - b.id);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">CheckIn And CheckOut</h2>
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Item ID:</label>
          <input
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        {errorMessage && <p className="mb-4 text-center text-red-500">{errorMessage}</p>}
        <div className="flex mb-6 space-x-4">
          <button
            onClick={handleCheckIn}
            className="w-full px-3 py-1 text-indigo-600 transition-colors duration-300 bg-transparent border border-indigo-600 rounded-md shadow-md hover:text-indigo-900 hover:bg-indigo-50 hover:border-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            className="w-full px-3 py-1 text-red-600 transition-colors duration-300 bg-transparent border border-red-600 rounded-md shadow-md hover:text-red-900 hover:bg-red-50 hover:border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            Check Out
          </button>
        </div>

        {checkInMutation.isLoading && <p className="text-center text-gray-500">Checking in...</p>}
        {checkInMutation.isError && <p className="text-center text-red-500">Error checking in</p>}
        {checkInMutation.isSuccess && <p className="text-center text-green-500">Checked in successfully!</p>}
        {checkOutMutation.isLoading && <p className="text-center text-gray-500">Checking out...</p>}
        {checkOutMutation.isError && <p className="text-center text-red-500">Error checking out</p>}
        {checkOutMutation.isSuccess && <p className="text-center text-green-500">Checked out successfully!</p>}

        <div>
          <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">Items</h1>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Search by Name:</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              placeholder="Enter item name"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">ID</th>
                  <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">Name</th>
                  <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">Category</th>
                  <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">Quantity</th>
                  <th className="px-4 py-2 text-left text-gray-600 border border-gray-200">Description</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems?.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700 border border-gray-200">{item.id}</td>
                    <td className="px-4 py-2 text-gray-700 border border-gray-200">{item.name}</td>
                    <td className="px-4 py-2 text-gray-700 border border-gray-200">{item.category}</td>
                    <td className="px-4 py-2 text-gray-700 border border-gray-200">{item.quantity}</td>
                    <td className="px-4 py-2 text-gray-700 border border-gray-200">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
