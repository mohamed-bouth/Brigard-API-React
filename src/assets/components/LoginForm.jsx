import axios from 'axios';
import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
export default function LoginForm() {

    const [emailError , useEmailError] = useState()
    const { backEndDomain, setBackEndDomain } = useContext(ApiContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
        navigate("/home");
        }
    }, [navigate]);

    async function handleClick(e){
        e.preventDefault()
        console.log(e.target.email.value)
        console.log(e.target.password.value,)
        try {
            const response = await axios.post(backEndDomain + "/login", {
            email: e.target.email.value,
            password: e.target.password.value,
            });
            localStorage.setItem("token", response.data.token)
            const userData = await  axios.get(backEndDomain + "/profile", {
                headers: {
                    Accept: "application/json",
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            localStorage.setItem('user' , JSON.stringify(userData.data.profile))
            navigate('/home')
            
        } catch (error) {
            console.log(error.response)
            if(error.response.data.message){
                useEmailError(error.response.data.message)
            }else{
                useEmailError()
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleClick} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4">
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

                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}


