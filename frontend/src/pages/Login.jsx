import React from 'react'
import Logo from '../assets/کسوة.png'
import { useNavigate } from 'react-router-dom'
import google from '../assets/Google.png'
import { IoEyeOutline } from "react-icons/io5";
import { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Login() {
  let [show,setShow]= useState(false)
  let [email,setEmail] = useState("")
      let [password,setPassword] = useState("")
      let [loading,setLoading] = useState(false)
      let {serverUrl}= useContext(authDataContext)
      let {getCurrentUser} = useContext(userDataContext)

     let navigate = useNavigate()

     const handleLogin = async(e)=>{
      e.preventDefault()
      setLoading(true)
      try{
        let result = await axios.post(serverUrl+'/api/auth/login',{
          email,password
        },{withCredentials:true})
        console.log(result.data)
        toast.success("Login Successful")
        getCurrentUser()
        navigate("/")
        setLoading(false)

      }catch(error){
        console.log(error)
        toast.error("Login Failed")
        setLoading(false)
      }
    }
      const googlelogin = async ()=>{
        try{
            const response = await signInWithPopup(auth,provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email

            const result = await axios.post(serverUrl + "/api/auth/googlelogin",{name,email}, {withCredentials:true})
            console.log(result.data)
             getCurrentUser()
             navigate("/")

        }
        catch(error){
            console.log(error)
        }
      }

   return (
     <div className='w-[100vw] h-[100vw] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
         <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'
          onClick={()=>navigate("/")}>
             <img className='w-[40px]' src={Logo} alt="" />
             <h1 className='text-[22px] font-sans'>Kiswa</h1>
          </div>
          <div className='w-[100%] h-[80px] flex items-center justify-center flex-col gap-[10px]'>
             <span className='text-[25px] font-semibold'>Login Page</span>
             <span className='text-[16px] '>Welcome to Kiswa,Place your order</span>
         </div>
         <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2x1 rounded-lg 
         shadow-lg flex items-center justify-center'>
             <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                 <div className='w-[90%] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px]
                  cursor-pointer' onClick={googlelogin} >
                     <img src={google} alt="" className='w-[20px]'/> Login account with Google</div>
                     <div className='w-[100%] flex items-center justify-center gap-[10px]'>
                     <div className='w-[40%] h-[1px] bg-[#96969635]'></div><span>OR</span><div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                     </div>
                      <div className='h-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
 
                         <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
                         backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffff7c] px-[20px] font-semibold'
                         placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email} />
                         <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
                         backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffff7c] px-[20px] font-semibold'
                         placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password} />
                         {!show && <IoEyeOutline className='w-[18px] h-[18px] cursor-pointer absolute right-[10%] bottom-[57%]'
                         onClick={()=>setShow(prev => !prev)}/>}
                         {show && <IoEye className='w-[18px] h-[18px] cursor-pointer absolute right-[10%] bottom-[57%]'
                         onClick={()=>setShow(prev =>!prev)}/>}
 
                         <button className='w-[100%] h-[50px] bg-[#6066f5] rounded-lg flex items-center
                         justify-center mt-[20px] text-[17px] font-semibold'>
                          {loading ? <Loading/> : "Login"}
                         </button>
                         <p className='flex gap-[10px]'>Create your free account<span className='text-[#55556fcf] text-[17px] 
                         font-semibold cursor-pointer' onClick={()=>navigate("/signup")}>Create New Account</span></p>
 
 
                     </div>
             </form>
         </div>
 
     </div>
   )
}

export default Login