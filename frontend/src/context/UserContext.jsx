import React, { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { useEffect } from 'react'
export const userDataContext = createContext()

function UserContext({children}) {
  let [userData,setUserData] = useState("")
   let {serverUrl} = useContext(authDataContext)
const getCurrentUser = async (params) => {
        try {
           let  result = await axios.post(
  "http://localhost:8000/api/user/getcurrentuser",
  {}, // empty body (or actual data if backend expects some)
  { withCredentials: true }
);


           setUserData(result.data)
           console.log(result.data)

        } catch (error) {
          setUserData(null)
          console.log(error)
        }
       }

       useEffect(()=>{ 
        getCurrentUser()
       },[])

let value = {
  userData,setUserData,getCurrentUser
}
       
  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext
