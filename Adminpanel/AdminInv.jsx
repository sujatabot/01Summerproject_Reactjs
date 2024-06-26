import React from 'react';
import { Link } from 'react-router-dom';

const AdminInv = () => {
  return (
    <div className="container max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-800"> Inventory Management</h1>
      <nav>
        <ul className="space-y-6">
        <li>
            <Link 
              to="/ItemForm" 
              className="block px-6 py-3 text-lg font-semibold text-center text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
            >
              Add Item
            </Link>
          </li>
          <li>
            <Link 
              to="/ItemList" 
              className="block px-6 py-3 text-lg font-semibold text-center text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
            >
              Item List
            </Link>
          </li>
          <li>
            <Link 
              to="/Checkinout" 
              className="block px-6 py-3 text-lg font-semibold text-center text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
            >
              Check In/Out
            </Link>
          </li>
          <li>
            <Link 
              to="/Report" 
              className="block px-6 py-3 text-lg font-semibold text-center text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
            >
              Report
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminInv;

