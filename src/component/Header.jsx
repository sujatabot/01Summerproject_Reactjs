import { NavLink, Outlet } from 'react-router-dom';




const Header = () => {
 




  return (
    <>
    <div className="sticky top-0 z-10 text-white shadow-lg">
      <header className="w-full px-6 py-4 bg-red-900">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">Srinivas Old Age</h1>
          <div className="flex items-center gap-5">
            <NavLink
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-red-900 transition duration-300 rounded bg-slate-200 hover:bg-red-300"
            >
              Login
            </NavLink>
          </div>
        </div>
      </header>
      <nav className="w-full bg-slate-200">
        <ul className="flex justify-center gap-10 py-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-black text-lg font-medium transition duration-300 ${isActive ? 'text-red-800' : 'hover:text-red-400'}`
              }
            >
              Home
            </NavLink>
          </li>
    
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-black text-lg font-medium transition duration-300 ${isActive ? 'text-red-800' : 'hover:text-red-400'}`
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `text-black text-lg font-medium transition duration-300 ${isActive ? 'text-red-800' : 'hover:text-red-400'}`
              }
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `text-black text-lg font-medium transition duration-300 ${isActive ? 'text-red-800' : 'hover:text-red-400'}`
              }
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-black text-lg font-medium transition duration-300 ${isActive ? 'text-red-800' : 'hover:text-red-400'}`
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet/>
    
      
    </div>
    
    </>
  );
};

export default Header;
