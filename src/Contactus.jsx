import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { SubmitContactFormApi } from './api/contactusapi/SubmitContactFormApi';
import Header from './component/Header';

const Contactus = () => {
  const successMessageRef = useRef(null);
  const errorMessageRef = useRef(null);

  const schema = z.object({
    name: z.string().min(5, { message: "Name must be at least 5 characters" }).max(30, { message: "Name must be less than 30 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phonenum: z.string().regex(/^\d{10}$/,{message:"phonenumber must be of 10 digits and number"}),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters" }).max(100, { message: "Subject must be less than 100 characters" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(500, { message: "Message must be less than 500 characters" })
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const { mutate: giveMessage, isError, isLoading, error, isSuccess, data } = SubmitContactFormApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      if (successMessageRef.current) {
        successMessageRef.current.textContent = 'Your message has been sent successfully!';
        errorMessageRef.current.textContent = '';
      }
      console.log('Navigating with data:', data); // Add this line for debugging
      navigate('/Contsuccess', { state: data });
    } else if (isError) {
      if (errorMessageRef.current) {
        errorMessageRef.current.textContent = error?.response?.data?.message || 'Submission failed';
        successMessageRef.current.textContent = '';
      }
    }
  }, [isSuccess, isError, error, navigate, data]);

  const submitData = (data) => {
    giveMessage(data);
  };

  return (<>
  <Header/>
    <div className='flex'>
    <img src="/photos/coverpage.jpg" className='w-full pl-10 pr-10 h-80' alt="Cover" />
  </div>
    <div className='flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100'>
      <h1 className='mb-8 text-4xl font-bold text-red-600'>Contact Form</h1>
      <p className='text-black '>Please fill up the form and reach out to us. We will respond to you as soon as possible.</p>
      <div className='w-full max-w-lg p-8 mt-8 bg-white rounded-lg shadow-md'>
        <form onSubmit={handleSubmit(submitData)}>
          <div className='mb-4'>
            <label className='block mb-1 text-sm font-bold text-black'>Name</label>
            <input id='name' type="text" className='w-full px-3 py-2 border rounded-md' placeholder='Enter your name*' {...register("name")} />
            {errors.name && <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block mb-1 text-sm font-bold text-black'>Email</label>
            <input id='email' type="email" className='w-full px-3 py-2 border rounded-md' placeholder='Enter your email address*' {...register("email")} />
            {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block mb-1 text-sm font-bold text-black'>Phone Number</label>
            <input id='phonenum' type="text" className='w-full px-3 py-2 border rounded-md' placeholder='9842....' {...register("phonenum")} />
            {errors.phonenum && <p className='mt-1 text-sm text-red-500'>{errors.phonenum.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block mb-1 text-sm font-bold text-black'>Subject</label>
            <input id='subject' type="text" className='w-full px-3 py-2 border rounded-md' placeholder='Enter the Subject' {...register("subject")} />
            {errors.subject && <p className='mt-1 text-sm text-red-500'>{errors.subject.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block mb-1 text-sm font-bold text-black'>Message</label>
            <textarea id='message' className='w-full px-3 py-2 border rounded-md' rows="4" placeholder='Enter your message*' {...register("message")}></textarea>
            {errors.message && <p className='mt-1 text-sm text-red-500'>{errors.message.message}</p>}
          </div>
          <button type='submit' className='w-full px-4 py-2 font-bold text-black text-white bg-indigo-600 rounded-md hover:bg-indigo-700'>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <p ref={successMessageRef} className='mt-4 text-center text-green-500'></p>
        <p ref={errorMessageRef} className='mt-4 text-center text-red-500'></p>
      </div>
    </div>
    </>
  );
};

export default Contactus;
