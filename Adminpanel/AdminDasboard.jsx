import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/Authenticator';

const drawerWidth = 240; // Adjust as needed

function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="sticky flex">
      <div className={`w-${drawerWidth} bg-gray-900 text-white`}>
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <div className="p-4">
          <ul>
            <li className="mb-4">
              <button
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                onClick={() => handleNavigation('/admin')}
              >
                Admin
              </button>
            </li>
            <li className="mb-4">
              <button
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => handleNavigation('/AdminInv')}
              >
                Inventory Handle
              </button>
            </li>
            <li className="mb-4 relative">
              <button
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={toggleMenu}
              >
                Home Page Handle
              </button>
              {showMenu && (
                <ul className="absolute left-0 z-10 w-full mt-2 text-gray-900 border border-gray-800 rounded-lg shadow-lg bg-white">
                  <li className="mb-2">
                    <button
                      className="block w-full px-4 py-2 text-left text-black bg-gray-300 hover:bg-gray-400 rounded-t-lg"
                      onClick={() => handleNavigation('/Admintext')}
                    >
                      Home Text Handle
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200 rounded-b-lg"
                      onClick={() => handleNavigation('/AdminHome1')}
                    >
                      Home Photo
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-4">
              <button
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => handleNavigation('/Adminblog')}
              >
                About Us Page Handle
              </button>
            </li>
            <li className="mb-4">
              <button
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => handleNavigation('/Admingallery')}
              >
                Gallery Handle
              </button>
            </li>
            <li className="mb-4">
              <button
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => handleNavigation('/Adminreg')}
              >
                Register Handle
              </button>
            </li>
            <li className="mb-4">
              <button
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => handleNavigation('/admincontact')}
              >
                Contact Handle
              </button>
            </li>
            <li className="mb-4">
              <button
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-grow min-h-screen p-4 bg-gray-100">
        {children}
      </div>
    </div>
  );
}

export { AdminDashboard };
