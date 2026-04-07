import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
export default function LoginForm() {
    const [formError, setFormError] = useState("");
    const { login, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);

    async function handleClick(e){
        e.preventDefault()
        setFormError("")

        const result = await login(e.target.email.value, e.target.password.value)
        if (result.ok) {
            navigate('/plates')
        } else {
            setFormError(result.message || "Login failed.")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 py-10">
            <form onSubmit={handleClick} className="mx-auto w-full max-w-sm space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                <div>
                    {formError ?
                    <label htmlFor="email" className="block text-sm font-semibold text-red-700 mb-1">
                        {formError}
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

                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
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


