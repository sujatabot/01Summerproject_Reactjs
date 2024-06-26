import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { useUserRegister } from './api/registerapi';

function Registration() {
  const schema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(30, { message: "Username must be less than 30 characters" }).nullable(),
    email: z.string().email({ message: "Invalid email address" }).min(8, { message: "Email must be at least 8 characters" }).max(24, { message: "Email must be less than 24 characters" }).nullable(),
    password: z.string().min(5, { message: "Password must be at least 5 characters" }).max(10, { message: "Password must be less than 10 characters" }).nullable(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const { mutate: registerUser, isLoading, isError, error, isSuccess } = useUserRegister();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input id="username" type="text" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Username" {...register("username")} />
              {errors.username && <p className='mt-1 text-sm text-red-500'>{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" type="email" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address" {...register("email")} />
              {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" type="password" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" {...register("password")} />
              {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button type="submit" className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link></p>
          </div>
        </form>
        {isError && <p className='mt-4 text-center text-red-600'>{error?.response?.data?.message || 'Registration failed'}</p>}
      </div>
    </div>
  );
}

export default Registration;