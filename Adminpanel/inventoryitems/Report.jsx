import React from 'react';
import { useReport } from '../../src/api/Inventoryapi/api2';

const Report = () => {
  const { data, isLoading, isError, error } = useReport();

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (isError) return <div className="flex items-center justify-center h-screen">Error: {error.message}</div>;

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-center">Report</h1>
        <div className="overflow-x-auto">
          <table className="w-3/4 mx-auto border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-2 border border-gray-300">Item</th>
                <th className="px-6 py-2 border border-gray-300">Quantity</th>
                <th className="px-8 py-2 border border-gray-300">Check-In/Out History</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.item} className="border-b border-gray-300">
                  <td className="px-6 py-2 border border-gray-300">{item.item}</td>
                  <td className="px-6 py-2 border border-gray-300">{item.quantity}</td>
                  <td className="relative px-6 py-2 border border-gray-300">
                    <ul className="pl-4 list-disc">
                      {item.checkInOutHistory.map(history => (
                        <li key={history.date}>
                          Action: {history.action}, Quantity: {history.quantity}, Date: {history.date}
                        </li>
                      ))}
                    </ul>
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;




