import React from 'react'
// import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { BsHouseFill, BsPeopleFill, BsBoxArrowRight } from 'react-icons/bs'
import { logOut } from '../../../actions/AuthAction'
import {useDispatch} from 'react-redux'

import './Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
//   const [cookie, setCookie, removeCookie] = useCookies([])

  const adminHome = () => {
    navigate('/admin')
  }

  const adminuserList = () => {
    navigate('/admin/user-list')
  }
  const handleLogout = ()=>{
    dispatch(logOut())
}

//   const Logout = () => {
//     removeCookie('adminjwt')
//     navigate('/admin/login')
//   }
  return (
        <div className='adminsidebar-main '>
            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={adminHome}>    <BsHouseFill /> Home</div>
            </div>
            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={adminuserList}>  <BsPeopleFill />  Users List</div>
            </div>

            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={handleLogout} >  <BsBoxArrowRight />  Logout</div>
            </div>
        </div>
  )
}

export default Sidebar