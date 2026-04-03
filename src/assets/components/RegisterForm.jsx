import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function RegisterForm() {

    const [emailError , useEmailError] = useState()
    const [nameError , useNameError] = useState()
    const [passwordError , usePasswordError] = useState()
    const navigate = useNavigate()

    useEffect(() => {
            if (localStorage.getItem("token")) {
            navigate("/home");
            }
        }, [navigate]);


    async function handleClick(e){
        e.preventDefault()
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            });
            localStorage.setItem('token' , response.data.token)
            const userData = await  axios.get("http://127.0.0.1:8000/api/profile", {
                headers: {
                    Accept: "application/json",
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            localStorage.setItem('user' , JSON.stringify(userData.data.profile))
            navigate('/home')
        } catch (error) {
            console.log('data:', error.response?.data);
            if(error.response.data.errors.name){
                useNameError(error.response.data.errors.name)
            }else{
                useNameError()
            }
            if(error.response.data.errors.email){
                useEmailError(error.response.data.errors.email)
            }else{
                useEmailError()
            }
            if(error.response.data.errors.password){
                usePasswordError(error.response.data.errors.password)
            }else{
                usePasswordError()
            }

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleClick} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4">

                <div>
                    {nameError ?
                    <label htmlFor="name" className="block text-sm font-medium text-red-700 mb-1">
                        {nameError}
                    </label>
                    :
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    }
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    {emailError ?
                    <label htmlFor="email" className="block text-sm font-medium text-red-700 mb-1">
                        {emailError}
                    </label>
                    :
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    }
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    {passwordError ?
                    <label htmlFor="password" className="block text-sm font-medium text-red-700 mb-1">
                        {passwordError}
                    </label>
                    :
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    }
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                        Password confirmation
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};