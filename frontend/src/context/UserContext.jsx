import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  // ✅ Corrected getCurrentUser
  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("User fetched:", result.data);
    } catch (error) {
      setUserData(null);
      console.log("getCurrentUser error:", error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
