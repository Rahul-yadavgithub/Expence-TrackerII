import React from 'react';

import {createContext, useState} from 'react';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {

  const [user, setUser] = useState(null);

  const updateUser = (userData)=>{
    setUser(userData);
  }

  const clearUser = ()=>{
    setUser(null);
  }

  const value = {
    user,
    updateUser,
    clearUser
  }

  return(
    <UserDataContext.Provider value = {value}>
      {children}
    </UserDataContext.Provider>
  )
};

export default UserContext;