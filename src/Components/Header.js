import '../index.css';

import { Link, Outlet } from "react-router";
import {MdSearch, MdDelete,MdNotifications, MdAdd, MdEdit, MdCalendarMonth } from 'react-icons/md';
import {FaSearch, FaEdit, } from 'react-icons/fa';
import {BsSearch, BsCalendar2Check, BsCalendar2Date, BsCalendarCheck, BsCalendarCheckFill, BsCalendar2CheckFill} from 'react-icons/bs';

function Header({ children }) {
  return (
    <div>
      {/* <div className="bg-indigo-700 w-full text-white px-2 py-3" > */}
      <div className="flex justify-between bg-yellow-100/20 shadow w-full h-16 mb-2 px-2 py-3 border" >

        <h1 className="mx-10 text-red-500 font-bold text-2xl"> To-D0</h1>

        <div className="flex mx-10">
          <input className="m-1 p-4 w-[400px] rounded-lg shadow-md border-none" type="text" placeholder="Search here " />
          <button className='m-1 p-2 bg-red-400 rounded'> <BsSearch className='text-white'/> </button>
        </div>

        <div className="flex mx-1">
        <button className='m-1 p-2 rounded bg-red-400'>   <MdNotifications className='text-white'/> </button>
        <button className='m-1 p-2 rounded bg-red-400'>   <MdCalendarMonth className='text-white'/> </button>
        </div>

        <div className=" mx-2">
          <p className="mx-1 text-black text-sm font-semibold"> Tuesday</p>
          <p className="mx-1 text-blue-400 text-sm font-semibold"> 20/01/2025</p>
        </div>

        {/* <nav>
          <Link to='/' className="p-3 m-5 rounded bg-indigo-800/20 hover:bg-indigo-800 font-semibold "> Task List  </Link>
          <Link to='/supa/express' className="p-3 m-5 rounded bg-indigo-800/20 hover:bg-indigo-800 font-semibold "> Movies  </Link>
        </nav> */}

      </div>

      <Outlet />

    </div>
  );
}

export default Header;
