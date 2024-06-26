import { useLocation } from 'react-router-dom';
import Header from '../component/Header';

const RegisterDone = () => {
  const location = useLocation();
  const { state } = location;
  const { newMessage } = state || {};

  console.log("Received newMessage:", newMessage); // Log the received newMessage

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-blue-100 to-indigo-200">
        <h1 className="mb-8 text-5xl font-extrabold text-indigo-700">Registration Successful</h1>
        {newMessage ? (
          <div className="w-full max-w-2xl p-10 bg-white rounded-lg shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Submitted Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600 border-b border-r border-gray-300">Field</th>
                    <th className="px-4 py-2 text-left text-gray-600 border-b border-r border-gray-300">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-medium text-gray-700 border-r border-gray-300">Name</td>
                    <td className="px-4 py-2 text-gray-800">{newMessage.name}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-medium text-gray-700 border-r border-gray-300">Phone Number</td>
                    <td className="px-4 py-2 text-gray-800">{newMessage.phonenumber}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-medium text-gray-700 border-r border-gray-300">Email</td>
                    <td className="px-4 py-2 text-gray-800">{newMessage.email}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-medium text-gray-700 border-r border-gray-300">Current Address</td>
                    <td className="px-4 py-2 text-gray-800">{newMessage.currentaddress}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-medium text-gray-700 border-r border-gray-300">Age</td>
                    <td className="px-4 py-2 text-gray-800">{newMessage.age}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-medium text-gray-700 border-r border-gray-300">Gender</td>
                    <td className="px-4 py-2 text-gray-800">{newMessage.gender}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-medium text-gray-700 border-r border-gray-300">Medical Condition</td>
                    <td className="px-4 py-2 text-gray-800">{newMessage.medicalcondition}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-gray-700 border-r border-gray-300">Query or Expectation</td>
                    <td className="px-4 py-2 text-gray-800">{newMessage.query}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-xl text-center text-red-500">No data available</p>
        )}
      </div>
    </>
  );
};

export default RegisterDone;
