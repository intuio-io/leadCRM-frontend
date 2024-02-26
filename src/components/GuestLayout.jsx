import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../context/Provider";
import { useContext } from "react";

const GuestLayout = () => {
    const {
        authState: { token },
    } = useContext(GlobalContext);

    if (token) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div className="font-body flex w-full min-h-screen justify-center items-center">
            <Outlet />
        </div>
    );
};

export default GuestLayout;
