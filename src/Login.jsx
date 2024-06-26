import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserLogin } from './api/loginapi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './component/Header';
import { useAuth } from './Authenticator';


function Login() {
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }).min(8, { message: "Email must be at least 8 characters" }).max(50, { message: "Email must be less than 24 characters" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters" }).max(10, { message: "Password must be less than 10 characters" }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const { mutate: logindata, isLoading, isError, error, isSuccess } = useUserLogin();
  const { checkToken, role } = useAuth();

  useEffect(() => {
    console.log("Role:", role);
    if (isSuccess) {
      console.log("Login successful");
      checkToken();
      if (role === "isAdmin") {
        navigate("/Admindash");
      } else {
        console.log("You are not an authorized user");
      }
    }
  }, [isSuccess, checkToken, role, navigate]);

  const onSubmit = (data) => {
    logindata(data);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className='flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8'>
        <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Log in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input 
                  id="email" 
                  type="email" 
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                  placeholder="Email address" 
                  {...register("email")} 
                />
                {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  id="password" 
                  type="password" 
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                  placeholder="Password" 
                  {...register("password")} 
                />
                {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
              </div>
            </div>
            <div>
              <button 
                type="submit" 
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? 'Logging in...' : 'Submit'}
              </button>
            </div>
          </form>
          {isError && (
            <p className='mt-4 text-center text-red-600'>
              {error?.response?.data?.message === "Invalid credentials" ? 'Invalid email or password' : 'Login failed'}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;