import { useState, useEffect, useRef, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import axiosClient from "../utils/axios-client";
import { GlobalContext } from "../context/Provider";
import { toast } from "react-toastify";

const Navbar = () => {
    const {
        authState: { user },
        authDispatch,
    } = useContext(GlobalContext);
    const [display, setDisplay] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setDisplay(false);
            }
        };
        document.addEventListener("mousedown", handler);
    }, [display]);

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/logout").then(() => {
            authDispatch({ type: "LOGOUT" });
        });
        return toast.info("Logged Out!");
    };
    return (
        <>
            <nav>
                <div className="mt-4 px-3 md:px-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center  text-sm text-gray-500 rounded-lg md:hidden focus:outline-none mr-2"
                            >
                                <RiMenu3Line className="h-7 w-7" />
                            </button>
                            <a href="/" className="flex md:ml-5">
                                <span className="text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-500 font-logo">
                                    <span className="text-4xl">L</span>EA
                                    <span className="text-indigo-500">DS</span>
                                </span>
                            </a>
                        </div>

                        <div className="flex items-center relative">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="flex items-center"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-user"
                                        onClick={() => setDisplay(true)}
                                    >
                                        <p className="text-lg text-gray-700 mr-3">
                                            Hi, {user.first_name}
                                        </p>
                                        <FaUserCircle className="w-8 h-8 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            <div
                                ref={menuRef}
                                className={`absolute right-0 z-50  w-48 mt-36 divide-y  rounded-md bg-white shadow-lg focus:outline-none ${
                                    !display ? "hidden" : ""
                                }`}
                            >
                                <div className="py-1" role="none">
                                    <a
                                        href="/"
                                        className="text-gray-700 block px-4 py-2 text-sm"
                                    >
                                        {user.email}
                                    </a>
                                </div>

                                <div className="py-1" role="none">
                                    <a
                                        onClick={onLogout}
                                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100  text-left cursor-pointer"
                                    >
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
