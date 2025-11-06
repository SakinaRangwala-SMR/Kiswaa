import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const adminDataContext = createContext()
function AdminContext({children}) {
    let [adminData,setAdminData] = useState(null)
    let {serverUrl} = useContext(authDataContext)


   const getAdmin = async () => {
    try {
        let result = await axios.post(
            serverUrl + "/api/user/getadmin",
            {}, // Correctly pass an empty object for the request body
            { withCredentials: true } // Pass withCredentials as part of the config object
        );
        setAdminData(result.data);
        console.log(result.data);
    } catch (error) {
        setAdminData(null);
        console.log(error);
    }
};

    useEffect(()=>{
     getAdmin()
    },[])


    let value = {
   adminData,setAdminData,getAdmin
    }
  return (

<adminDataContext.Provider value={value}>
    {children}
</adminDataContext.Provider>

  )
}

export default AdminContext