import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../context/Provider";
import { useContext, useEffect } from "react";
import axiosClient from "../utils/axios-client";
import { Navbar, Sidebar } from "./index";
import { updateToken } from "../context/actions/authActions";

const DefaultLayout = () => {
    const {
        authState: { token },
        authDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {
        if (!token) {
            return;
        }
        axiosClient.get("/user").then(({ data }) => {
            authDispatch({ type: "SET_USER", payload: data });
        });
    }, [token, authDispatch]);

    useEffect(() => {
        const refreshToken = setTimeout(() => {
            updateToken(authDispatch);
        }, 1000);

        return () => {
            clearTimeout(refreshToken);
        };
    }, [authDispatch]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="font-body pb-14">
            <Navbar />
            <Sidebar />

            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
