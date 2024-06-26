import  { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SubmitRegistrationFormApi } from '../api/registrationApi/SubmitRegistrationFormApi';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';


const Register = () => {

  const successMessageRef = useRef(null);
  const errorMessageRef = useRef(null);

  const schema = z.object({
    name: z.string().min(5, 'Name should be at least 5 characters long').max(20, 'Name should be at most 20 characters long'),
    currentaddress: z.string().min(2, 'Address should be at least 2 characters long').max(50, 'Address should be at most 50 characters long'),
    phonenumber: z.string().regex(/^\d{10}$/,{message:"phonenumber must be of 10 digits and number"}),
    age: z
    .number()
    .positive('Age must be a positive number')
    .min(61, 'Age must be greater than 60')
    .max(95, 'Age must be less than 95')
    .transform((val) => Math.floor(val)) 
    .optional(),
    gender: z.string().min(4, 'Please select a gender').max(6, 'Please select a gender').refine((val) => val === 'Male' || val === 'Female', {
      message: 'Invalid gender selection',
    }),
    email: z.string().email('Invalid email address').min(8, 'Email should be at least 8 characters long').max(24, 'Email should be at most 24 characters long'),
    medicalcondition: z.string().optional(),
    query: z.string().optional(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate: giveMessage, isError, isLoading, error, isSuccess, data } = SubmitRegistrationFormApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      if (successMessageRef.current) {
        successMessageRef.current.textContent = 'Your message has been sent successfully!';
        errorMessageRef.current.textContent = '';
      }
      console.log('Received data from API:', data); // Log the data received from the API
      navigate('/RegisterDone', { state: { newMessage: data.newMessage } });
    } else if (isError) {
      if (errorMessageRef.current) {
        errorMessageRef.current.textContent = error?.response?.data?.message || 'Submission failed';
        successMessageRef.current.textContent = '';
      }
    }
  }, [isSuccess, isError, error, navigate, data]);

  const Submit = (data) => {
    console.log('Submitting data:', data); // Log the submitted data
    giveMessage(data);
  };

  return (
    <>
    <Header/>
      <div className='flex'>
        <img src="/photos/coverpage.jpg" className='w-full pl-10 pr-10 h-80' alt="Cover" />
      </div>

      <div className='flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100'>
        <p className='pb-3 pl-8 pr-8'> Health care delivery system in Nepal has been improving & more population now has access mainly in primary health care. People’s life expectancy has been increased substantially compared to the past due to advancement, availability & information dissemination of medical & health care services. However, specific health services targeted to specific groups is still lacking.Traditionally it’s been the immediate family members who have been the primary care givers especially for their older relatives.</p>
        <p className='pb-3 pl-8 pr-8'>There has been a distinct change in our society in terms of the mass movement of the youth to foreign countries in search of better job opportunities. This has led to households full of older people –without the support of their younger relatives. While major health issues have to be treated in the hospital, there are so many relatively minor health problems that can be addressed by home services.This project has been initiated recognizing the need for such specialized health care.</p>
        <h1 className='mb-8 text-4xl font-bold text-red-600'>Registration Form</h1>
        <form className='w-full max-w-2xl p-10 bg-white rounded-lg shadow-lg' onSubmit={handleSubmit(Submit)}>
          <h2 className='mb-6 text-lg font-semibold text-center text-gray-700'>Please enter your parents details below</h2>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>Name:</label>
            <input {...register('name')} type="text" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
            {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>Mobile/Phone no:</label>
            <input {...register('phonenumber')} type="text" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
            {errors.phonenumber && <span className='text-sm text-red-500'>{errors.phonenumber.message}</span>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>Email:</label>
            <input {...register('email')} type="email" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
            {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>Current Address:</label>
            <input {...register('currentaddress')} type="text" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
            {errors.currentaddress && <span className='text-sm text-red-500'>{errors.currentaddress.message}</span>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>Age:</label>
            <input {...register('age', { valueAsNumber: true })} type="number" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
            {errors.age && <span className='text-sm text-red-500'>{errors.age.message}</span>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>Gender:</label>
            <select {...register('gender')} className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <span className='text-sm text-red-500'>{errors.gender.message}</span>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>Medical Condition:</label>
            <input {...register('medicalcondition')} type="text" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
            {errors.medicalcondition && <span className='text-sm text-red-500'>{errors.medicalcondition.message}</span>}
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>Any Query or Expectation:</label>
            <textarea {...register('query')} rows="4" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'></textarea>
            {errors.query && <span className='text-sm text-red-500'>{errors.query.message}</span>}
          </div>
          <button type='submit' className='w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700' disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <p ref={successMessageRef} className='mt-4 text-center text-green-500'></p>
        <p ref={errorMessageRef} className='mt-4 text-center text-red-500'></p>
      </div>
    </>
  );
};

export default Register;
