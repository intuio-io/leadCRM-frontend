/* eslint-disable react-refresh/only-export-components */
import { MdDashboardCustomize, MdPersonOutline } from "react-icons/md";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { memo } from "react";

const Sidebar = () => {
    return (
        <>
            <aside
                id="logo-sidebar"
                className="pt-6 -translate-x-48 md:translate-x-0 w-36 sticky -top-5"
                aria-label="Sidebar"
            >
                <div className="h-full pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium ">
                        <li>
                            <NavLink to="/dashboard">
                                {({ isActive }) => (
                                    <span
                                        className={`py-2 pl-5 flex items-center rounded-lg gap-3 text-gray-600 hover:text-indigo-500 ${
                                            isActive && "text-indigo-500"
                                        }`}
                                    >
                                        <MdDashboardCustomize
                                            className={`w-6 h-6`}
                                        />
                                        <span>Dashboard</span>
                                    </span>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/clients">
                                {({ isActive }) => (
                                    <span
                                        className={`py-2 pl-5 flex items-center rounded-lg gap-3 text-gray-600 hover:text-indigo-500 ${
                                            isActive && "text-indigo-500"
                                        }`}
                                    >
                                        <MdPersonOutline
                                            className={`w-6 h-6`}
                                        />
                                        <span>Clients</span>
                                    </span>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/campaigns">
                                {({ isActive }) => (
                                    <span
                                        className={`py-2 pl-5 flex items-center rounded-lg gap-3 text-gray-600 hover:text-indigo-500 ${
                                            isActive && "text-indigo-500"
                                        }`}
                                    >
                                        <AiOutlineCodeSandbox
                                            className={`w-6 h-6`}
                                        />
                                        <span>Campaigns</span>
                                    </span>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/leads">
                                {({ isActive }) => (
                                    <span
                                        className={`py-2 pl-5 flex items-center rounded-lg gap-3 text-gray-600 hover:text-indigo-500 ${
                                            isActive && "text-indigo-500"
                                        }`}
                                    >
                                        <FaRegAddressBook
                                            className={`w-5 h-5 ml-1`}
                                        />
                                        <span>Leads</span>
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default memo(Sidebar);
