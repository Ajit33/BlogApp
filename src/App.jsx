
import { useEffect, useState } from 'react'
import './App.css'
import  config from "./conf/config"
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/AuthSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
function App() {

 const [loading,setloading]=useState(true)
 const dispatch=useDispatch()


useEffect(()=>{
  authService.getCurrentStatus()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  })
  .finally(()=>setloading(false))
},[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        { /* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) :<h1>Loading...</h1>
}

export default App
