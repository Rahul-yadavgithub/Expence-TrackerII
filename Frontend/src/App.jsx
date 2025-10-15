import React from 'react';

import { Toaster } from "react-hot-toast";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UserContext from './Context/UserContext.jsx';

import Login from './Pages/AuthPage/Login.jsx';
import SignUp from './Pages/AuthPage/SignUp.jsx';
import Home from './Pages/Dashboard/Home.jsx';



const App = () =>{
  return(
    <UserContext>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>

      <Toaster

      toastOptions = {{
        className: "",
        style: {
            fontSize: "13px",
        },
      }}
      />
    </UserContext>
  );
};


export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/login" />
  );
};
