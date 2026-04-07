import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterForm() {

    const [emailError , useEmailError] = useState()
    const [nameError , useNameError] = useState()
    const [passwordError , usePasswordError] = useState()
    const { register, token } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
            if (token) {
            navigate("/home");
            }
        }, [token, navigate]);


    async function handleClick(e){
        e.preventDefault()

        useNameError("")
        useEmailError("")
        usePasswordError("")

        const result = await register({
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        })

        if (result.ok) {
            navigate('/home')
            return
        }

        const errors = result.errors ?? {}
        const nameMessage = Array.isArray(errors.name) ? errors.name[0] : errors.name
        const emailMessage = Array.isArray(errors.email) ? errors.email[0] : errors.email
        const passwordMessage = Array.isArray(errors.password) ? errors.password[0] : errors.password

        if (nameMessage) {
            useNameError(nameMessage)
        }
        if (emailMessage) {
            useEmailError(emailMessage)
        }
        if (passwordMessage) {
            usePasswordError(passwordMessage)
        }

        if (!nameMessage && !emailMessage && !passwordMessage && result.message) {
            useEmailError(result.message)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 py-10">
            <form onSubmit={handleClick} className="mx-auto w-full max-w-sm space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">

                <div>
                    {nameError ?
                    <label htmlFor="name" className="block text-sm font-semibold text-red-700 mb-1">
                        {nameError}
                    </label>
                    :
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                        Name
                    </label>
                    }
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div>
                    {emailError ?
                    <label htmlFor="email" className="block text-sm font-semibold text-red-700 mb-1">
                        {emailError}
                    </label>
                    :
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                        Email
                    </label>
                    }
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div>
                    {passwordError ?
                    <label htmlFor="password" className="block text-sm font-semibold text-red-700 mb-1">
                        {passwordError}
                    </label>
                    :
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                    </label>
                    }
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
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
                    className="w-full rounded-xl bg-emerald-600 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};