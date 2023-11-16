import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/AuthSlice'

const Logout = () => {
    const dispatch =useDispatch();
    const logoutHandeler=()=>{
        authService.logout()
    }
  return (
    <div>Logout</div>
  )
}

export default Logout