export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    // First of all we need to define the authentication api 

    AUTH : {
        LOGIN : "/api/auth/login",
        REGISTER : "/api/auth/signUp",
        GET_USER_INFO : "/api/user/currentUser",
        LOGOUT : "/api/auth/logout"
    },
    IMAGE : {
        UPLOAD_IMAGE : "/api/image/upload"
    },
    DASHBOARD : {
        GET_DATA : "/api/home"

    },
    EXPENSE :{
        ADD_EXPENSE : "/api/expense/add",
        GET_ALL_EXPENSE : '/api/expense/get',
    }
};