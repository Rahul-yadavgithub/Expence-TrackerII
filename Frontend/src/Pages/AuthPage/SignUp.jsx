import React from 'react';

import {useContext, useState} from 'react';

import { Link, useNavigate } from "react-router-dom";

import AuthLayOut from "../../Components/LayOuts/AuthLayOut.jsx";

import Input from "../../Components/Inputs/input.jsx";

import { validateEmail } from "../../Utils/helper.js";

import axiosInstance from "../../Utils/axiosInstance.js";

import { API_PATHS } from "../../Utils/apiPaths.js";

import { UserDataContext } from "../../Context/UserContext.jsx";

import uplaodImage  from "../../Utils/uploadImage.js";

import ProfilePhotoSelector from "../../Components/Inputs/ProfilePhotoSelector.jsx";

const SignUp = () =>{

    const [profilePic, setProfilePic] = useState(null);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const {updateUser} = useContext(UserDataContext);

    const navigate = useNavigate();

    const handleSignUp = async(e) =>{
        e.preventDefault();

        let profileImageUrl = "";

        if(!name){
            setError("Please Enter your Full Name");
            return;
        }

        if(!validateEmail(email)){
            setError("Please Enter the Correct EmailID");
            return;
        }

        if(!password || password.length <8){
            setError("Please Enter 8 Characters Password");
            return;
        }

        if(password !== confirmPassword){
            setError("Password not matched");
            return;
        }

        setError("");

        try{
            if(profilePic){
                const imageUploadUrl = await uplaodImage(profilePic);
                profileImageUrl = imageUploadUrl.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER  , {
                name,
                email,
                password,
                profileImageUrl
            });

            const {user,token} = response.data;

            if(user){
              localStorage.setItem("token", token);
                updateUser(user);
                navigate("/home");
            }
        }
        catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }
            else{
                setError("Something went wrong Please try again later");
            }
        }
    }


  return (
    <AuthLayOut>
      {/* Centered card with glassmorphism */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-2xl transform transition hover:-translate-y-1">
          <h3 className="text-2xl font-bold text-gray-800">
            Create an Account to Get Started
          </h3>
          <p className="text-sm text-gray-600 mt-2 mb-6">
            Join Us and Start Managing Your Expenses with Ease
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              label="Full Name"
              placeholder="John Doe"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />

            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Confirm Password"
              placeholder="Repeat your password"
              type="password"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              SIGN UP
            </button>

            <p className="text-sm text-gray-600 text-center mt-3">
              Already have an account?{" "}
              <Link
                className="font-medium text-purple-600 underline hover:text-purple-800"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayOut>
  );
};

export default SignUp;

