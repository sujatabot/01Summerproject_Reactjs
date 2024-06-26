import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ContactusSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    if (!state) {
      navigate('/'); // Redirect to home if no state is passed
    } else {
      console.log('Received data in success page:', state); // Add this line for debugging
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { newmesage } = state;
  const { name, email, phonenum, subject, message } = newmesage || {};

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100'>
      <h1 className='mb-8 text-4xl font-bold text-green-600'>Submission Successful!</h1>
      <div className='w-full max-w-lg p-8 bg-white rounded-lg shadow-md'>
        <h2 className='mb-4 text-2xl font-bold'>Submitted Data</h2>
        {newmesage ? (
          <table className='w-full border-collapse'>
            <tbody>
              <tr>
                <th className='px-4 py-2 border'>Name</th>
                <td className='px-4 py-2 border'>{name}</td>
              </tr>
              <tr>
                <th className='px-4 py-2 border'>Email</th>
                <td className='px-4 py-2 border'>{email}</td>
              </tr>
              <tr>
                <th className='px-4 py-2 border'>Phone Number</th>
                <td className='px-4 py-2 border'>{phonenum}</td>
              </tr>
              <tr>
                <th className='px-4 py-2 border'>Subject</th>
                <td className='px-4 py-2 border'>{subject}</td>
              </tr>
              <tr>
                <th className='px-4 py-2 border'>Message</th>
                <td className='px-4 py-2 border'>{message}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No message details available.</p>
        )}
      </div>
    </div>
  );
};

export default ContactusSuccess;
