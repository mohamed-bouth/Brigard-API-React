import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Navigation() {
    return (
        <>
            <div className="flex w-100% h-10 bg-black text-white items-center justify-center gap-10">
                <Link to={'/home'}>HOME</Link>
                <Link to={'/plates'}>PLATES</Link>
                <Link to={'/plates/create'}>PLATES CREATE</Link>
            </div>
            <Outlet/>
        </>
    );
}