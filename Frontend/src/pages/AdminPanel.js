import React, { useEffect } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(user?.role !== ROLE.ADMIN){
          navigate("/")
        }
    },[user])
return (
    <div className="min-h-[calc(100vh-100px)] md:flex hidden">
        <aside className="bg-white min-h-full w-full max-w-80">
            <div className='h-32 bg-gray-400 flex justify-center items-center flex-col'>
              <div className='text-6xl cursor-pointer relative flex justify-center'>
                {
                user?.profilePic ? (
                  <img src={user?.profilePic} className= 'w-10 h-10 rounded-full' alt={user?.name} />
                  ) : (
                    <FaRegUserCircle/>
                  )
                }
              </div>
              <p className='capitalize text-lg font-semibold'>{user?.firstName}</p>
              <p>{user?.role}</p>
            </div>

            {/*** navigation */}
            <div>
              <nav className='grid p-4'>
                <Link to={"all-users"} className='p-2 py-1 hover:bg-slate-100'> All users</Link>
                <Link to={"all-products"} className='p-2 py-1 hover:bg-slate-100'> Upload product</Link>
              </nav>
            </div>
        </aside>
        <main className="h-full w-full p-2">
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel