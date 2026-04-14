import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const registerSchema = z.object({
  name: z.string()
    .min(1, 'name is required')
    .min(3, "name must be at least 3 characters"),

  email: z.string()
    .min(1, "email is required"),

  password: z.string()
    .min(1, "password is required")
    .min(8, "password must be at least 8 characters"),
})

export default function RegisterForm() {

    const [serverError , setServerError] = useState({})
    const { Register, token } = useAuth();
    const navigate = useNavigate()
    const {register , handleSubmit , formState : { errors }} = useForm({
        resolver: zodResolver(registerSchema)
    })

    useEffect(() => {
            if (token) {
            navigate("/home");
            }
        }, [token, navigate]);


    async function handleClick(data){

        const result = await Register({
            name: data.name,
            email: data.email,
            password: data.password
        })

        if (result.ok) {
            navigate('/home')
            return
        } else {
            console.log(result.errors)
            setServerError((result.errors ) || {})
            
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 py-10">
            <form onSubmit={handleSubmit(handleClick)} className="mx-auto w-full max-w-sm space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                    {serverError.name && (
                        <p className="mt-1 text-sm text-red-600 text-center">
                        {serverError.name[0]}
                    </p>
                    
                    )}
                    {serverError.email && (
                        <p className="mt-1 text-sm text-red-600 text-center">
                        {serverError.email[0]}
                    </p>
                    )}
                    
                    {serverError.password && (
                        <p className="mt-1 text-sm text-red-600 text-center">
                        {serverError.password[0]}
                    </p>
                    )}
                    
                    
                    
                    
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        id="name"
                        name="name"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                    </p>
                    )}
                </div>

                <div>          
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        id="email"
                        name="email"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                    </p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password")}
                        id="password"
                        name="password"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                    </p>
                    )}
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