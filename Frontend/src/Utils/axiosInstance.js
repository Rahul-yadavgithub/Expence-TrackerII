import axios from 'axios';

import {BASE_URL} from './apiPaths'

const axiosInstance = axios.create({
    baseURL : BASE_URL,
    timeout : 100000,
    headers : {
        "Content-Type": "application/json",  // This tell the server i am sending the data in the form of the json formate 
        Accept : "application/json"     // Now client request server that in back please sent the data also in the json formate 
    },
    withCredentials : true,
});

axiosInstance.interceptors.response.use( (response) =>{
    return response;
},
// If we get some error in the response we need to return ans eror 

(error) => {
    if(error.response){
        if(error.response.status === 401){
            window.location.href = "/login";
        }
        else if(error.response.status === 500){
            console.log("Internal Server Error please try again Later");
        }
    }
    else if(error.code === "ECONNABORTED"){
        console.log("A Time out Has occured . please try again Later")
    }

    return Promise.reject(error);
}

);

export default axiosInstance;