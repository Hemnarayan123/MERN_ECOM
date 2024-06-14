import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthToken';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
    }
  }, [role, navigate]);

  return (
    <div className='min-h-[calc(100vh-120px)] flex'>
      <aside className='bg-gray-800 text-white min-h-full w-64 p-4'>
        <div className='h-32 flex justify-center items-center flex-col'>
          <div className='text-5xl cursor-pointer relative flex justify-center'>
            {/* Uncomment and update this section if user profile pic is available */}
            {/* {
            user?.profilePic ? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
            ) : (
                <FaRegCircleUser/>
            )
            } */}
          </div>
          <p className='capitalize text-lg font-semibold mt-2'>{role?.name}</p>
          <p className='text-sm'>{role?.role}</p>
        </div>
        {/*** Navigation ***/}
        <nav className='mt-8'>
          <Link to="all-users" className='block px-2 py-2 hover:bg-gray-700 rounded'>All Users</Link>
          <Link to="all-products" className='block px-2 py-2 hover:bg-gray-700 rounded'>All Products</Link>
        </nav>
      </aside>

      <main className='flex-grow bg-gray-100 p-4'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
