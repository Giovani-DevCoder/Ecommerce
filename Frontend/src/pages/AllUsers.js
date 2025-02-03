import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'sonner'
import moment from 'moment'
import { MdEditDocument } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {
const [allUser,setAllUsers] = useState([])
const [openUpdateRole,setOpenUpdateRole] = useState(false)
const [updateUserDetails,setUpdateUserDetails] = useState({
  email : "",
  firstName : "",
  role : "",
  _id : ""
})

  const fetchAllUsers = async() =>{
    const fetchData = await fetch(SummaryApi.allUser.url,{
      method : SummaryApi.allUser.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json()

    if(dataResponse.success){
        setAllUsers(dataResponse.data)
    }

    if(dataResponse.error){
      toast.error(dataResponse.message)
    }
  }

  useEffect(()=>{
    fetchAllUsers()
  },[]);

  return (
    <div className='pb-4 bg-white'>
        <table className='w-full userTable'>
            <thead>
                  <tr className='bg-black text-white'>
                      <th>ID</th>
                      <th>firstName</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created date</th>
                      <th>Action</th>
                  </tr>
            </thead>
            <tbody className=''>
                {
                    allUser.map((el, index)=>{
                      return(
                          <tr>
                              <td>{index+1}</td>
                              <td>{el?.firstName}</td>
                              <td>{el?.email}</td>
                              <td>{el?.role}</td>
                              <td>{moment(el?.createdAt).format("ll")}</td>
                              <td className='bg-gray-900 cursor-pointer hover:bg-gray-700' 
                              onClick={()=>{
                                setUpdateUserDetails(el)
                                setOpenUpdateRole(true)
                              }}
                              >
                                <button className='text-white'>
                                  <MdEditDocument/>
                                </button>
                              </td>
                          </tr>
                      )
                    })
                }
            </tbody>
        </table>
        {
          openUpdateRole && (
              <ChangeUserRole onClose={()=>setOpenUpdateRole(false)}
              firstName={updateUserDetails.firstName}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
              />
          )
        }
    </div>
  )
}

export default AllUsers