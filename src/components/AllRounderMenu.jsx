/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, memo } from "react";
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useRef } from "react";
import { deleteClient } from "../context/actions/clientActions";
import { deleteField } from "../context/actions/fieldActions";
import { deleteFilter } from "../context/actions/filterActions";

const AllRounderMenu = ({ row, name, dispatch }) => {
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
        if (name === "client") {
            deleteClient(dispatch, { name: name, rowId: row.id });
        }

        if (name === "attribute") {
            deleteField(dispatch, { rowId: row.id });
        }

        if (name === "filter") {
            deleteFilter(dispatch, { rowId: row.id });
        }
    };

    return (
        <>
            <div className="relative">
                <button
                    className="shadow-[0_0_0_1.2px_rgba(0,0,0,0.1)] border-slate-300 p-1.5 rounded bg-white"
                    onClick={() => {
                        setDisplay(true);
                    }}
                >
                    <IoMdSettings className="h-4 w-4 text-indigo-500" />
                </button>

                <div
                    ref={menuRef}
                    className={`absolute z-30  ml-[-7.5rem] mt-2 w-36   divide-y border rounded-md bg-white shadow-lg focus:outline-none ${
                        !display ? "hidden" : ""
                    }`}
                >
                    <div className="py-1" role="none">
                        <button
                            onClick={() => {
                                dispatch({
                                    type: "FORM_UPDATE",
                                    payload: { ...row },
                                });
                            }}
                            className="text-indigo-500 px-4 py-2 text-sm flex items-center hover:bg-slate-100 w-full"
                        >
                            <MdOutlineModeEdit className="h-5 w-5 mr-2" />
                            Edit
                        </button>

                        <button
                            onClick={onDelete}
                            className="text-indigo-500 px-4 py-2 text-sm flex items-center hover:bg-slate-100 w-full"
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

export default memo(AllRounderMenu);
