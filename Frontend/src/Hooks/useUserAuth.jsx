import React from 'react';

import {useContext, useEffect} from 'react';

import {UserDataContext} from '../Context/UserContext.jsx';

import {useNavigate}  from 'react-router-dom';

import  axiosInstance  from '../Utils/axiosInstance.js';

import {API_PATHS}  from '../Utils/apiPaths.js';

export const useUserAuth = () =>{

    const {user, updateUser, cleanUser} = useContext(UserDataContext);

    const navigate =  useNavigate();

    useEffect( () =>{
        let isMounted = true;

        if(user) return; // means user data we have already have so no need to fetch the data from the backend 

        const fetchUserInfo = async () =>{
            try{

                const result = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if(isMounted  && result.data){
                    updateUser(result.data);
                }
            }
            catch(error){
                console.error("Failed To Fetch the User Info ", error);

                // Now we need to clear the userData and redirect to the login page

                if(isMounted){
                    updateUser(null);
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return ()=>{
            isMounted = false;
        }
    }, [updateUser, cleanUser,navigate , user]);
};