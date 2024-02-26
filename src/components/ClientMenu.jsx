import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/Provider";
import {
    deleteSupplier,
    deleteBuyer,
} from "../context/actions/campaignClientActions";
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRef } from "react";

const ClientMenu = ({ row, name }) => {
    const { campaignClientDispatch } = useContext(GlobalContext);
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

    const onDelete = (e) => {
        e.preventDefault();
        if (name === "supplier") {
            deleteSupplier(campaignClientDispatch, { rowId: row.id });
        }

        if (name === "buyer") {
            deleteBuyer(campaignClientDispatch, { rowId: row.id });
        }
        setDisplay(false);
    };

    return (
        <>
            <div className="relative">
                <div>
                    <button
                        className="shadow-[0_0_0_1.2px_rgba(0,0,0,0.1)] border-slate-300 p-1.5 rounded bg-white"
                        onClick={() => {
                            setDisplay(true);
                        }}
                    >
                        <IoMdSettings className="h-4 w-4 text-indigo-500" />
                    </button>
                </div>

                <div
                    ref={menuRef}
                    className={`absolute z-30  ml-[-7.5rem] mt-2 w-36   divide-y border rounded-md bg-white shadow-lg focus:outline-none ${
                        !display ? "hidden" : ""
                    }`}
                >
                    <div className="py-1" role="none">
                        <Link
                            to={`/campaigns/${row.campaign_id}/${name}/${row.id}`}
                            className="text-indigo-500 px-4 py-2 text-sm flex items-center hover:bg-slate-100"
                        >
                            <MdOutlineModeEdit className="h-5 w-5 mr-2" />
                            Edit
                        </Link>

                        <Link
                            to="/"
                            className="text-indigo-500 px-4 py-2 text-sm flex items-center hover:bg-slate-100"
                        >
                            <FaRegAddressBook className="h-4 w-4 mr-3" />
                            Leads
                        </Link>
                    </div>

                    <div className="py-1" role="none">
                        <button
                            className="text-indigo-500 px-4 py-2 text-sm flex items-center hover:bg-slate-100 w-full"
                            onClick={onDelete}
                        >
                            <MdOutlineDeleteOutline className="h-5 w-5 mr-2" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientMenu;
