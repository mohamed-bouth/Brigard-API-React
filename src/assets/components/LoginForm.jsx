import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email: z.string()
    .min(1, "email is required")
    .email("email is invalid"),

  password: z.string()
    .min(1, "password is required")
    .min(8, "password must be at least 8 characters"),
})

export default function LoginForm() {
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const [serverError , setServerError] = useState()
    
    const {register , handleSubmit , formState : { errors }} = useForm({
        resolver: zodResolver(loginSchema)
    })

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);

    async function handleClick(data){

        const result = await login(data.email, data.password)
        if (result.ok) {
            navigate('/plates')
        } else {
            setServerError(result.message || "Login failed.")
            console.log(serverError)
        }
        
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 py-10">
            <form onSubmit={handleSubmit(handleClick)} className="mx-auto w-full max-w-sm space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                <div>   
                    <p className="mt-1 text-sm text-red-600 text-center">
                        {serverError}
                    </p>
                    
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                        Email
                    </label>
                    
                    <input
                        type="email"
                        {...register("email",)}
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
                        {...register("password",)}
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

                <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}



