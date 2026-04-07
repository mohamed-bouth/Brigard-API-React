import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    return (
        <>
            <div className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur border-b border-gray-200">
                <div className="mx-auto flex h-14 max-w-6xl items-center px-6">
                    <div className="flex items-center gap-6 text-sm font-semibold text-gray-800">
                        <Link className="tracking-wide hover:text-emerald-600" to={'/home'}>HOME</Link>
                        <Link className="tracking-wide hover:text-emerald-600" to={'/plates'}>PLATES</Link>
                        <Link className="tracking-wide hover:text-emerald-600" to={'/plates/create'}>PLATES CREATE</Link>
                        {token && <Link className="tracking-wide hover:text-emerald-600" to={'/profile'}>PROFILE</Link>}
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        {token && user?.name && (
                            <span className="text-xs font-medium text-gray-500">Hi, {user.name}</span>
                        )}
                        {token ? (
                            <button className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-emerald-500 hover:text-emerald-600" onClick={handleLogout} type="button">
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-emerald-500 hover:text-emerald-600" to={'/login'}>LOGIN</Link>
                                <Link className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-emerald-700" to={'/register'}>REGISTER</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    );
}