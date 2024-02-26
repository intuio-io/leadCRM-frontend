import { useEffect, useContext } from "react";
import { getClients } from "../context/actions/clientActions";
import { GlobalContext } from "../context/Provider";
import DataTable from "react-data-table-component";
import { customStyles, clientColumns } from "../utils/TableStyles";
import {
    LoadingSpinner,
    Search,
    ClientModal,
    AllRounderMenu,
} from "../components";
import axios from "axios";

const Clients = () => {
    const {
        clientState: { clients, records, loading },
        clientDispatch,
    } = useContext(GlobalContext);

    const ExpandedComponent = ({ data }) => {
        return (
            <div className="flex">
                <p className="py-4 pl-16 bg-[#ebf5fb] w-full">
                    <b>Last name</b> : {data.last_name}
                </p>
                <p className="py-4 pl-16 bg-[#ebf5fb] w-full">
                    <b>Phone</b> : {data.phone}
                </p>
            </div>
        );
    };

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        getClients(clientDispatch, cancelToken);
        return () => {
            cancelToken.cancel("Operation cancelled by the user");
        };
    }, [clientDispatch]);

    return (
        <>
            <ClientModal />
            <div className="pb-4 md:ml-48 bg-white rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  m-auto -mt-52 md:-mt-48 mx-4 md:mx-0">
                <div className="flex min-[320px]:justify-between justify-center py-4 px-4 items-center rounded">
                    <div>
                        <h1 className="text-xl hidden sm:inline-block text-slate-700 tracking-widest font-bold">
                            Clients
                        </h1>
                    </div>

                    <div>
                        <Search state={clients} Dispatch={clientDispatch} />
                    </div>
                </div>

                <hr className="h-0.5 bg-gray-200 border-0" />

                <div className="relative md:px-6">
                    <DataTable
                        columns={clientColumns}
                        data={records}
                        progressPending={loading}
                        progressComponent={<LoadingSpinner />}
                        defaultSortAsc={true}
                        pagination
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        responsive
                        highlightOnHover
                        customStyles={customStyles}
                    />
                    <p className="-mt-10 hidden md:block text-md text-gray-800 ml-4">
                        {records.length} results
                    </p>

                    <div className="flex justify-end items-end">
                        <div className="absolute  bg-white shadow-[-5px_0_7px_-5px_rgba(0,0,0,0.1)] top-[3.25rem]">
                            {records.map((row) => {
                                return (
                                    <div
                                        className={`px-3 h-12 flex items-center ${
                                            loading && `hidden`
                                        }`}
                                        key={row.id}
                                    >
                                        <AllRounderMenu
                                            row={row}
                                            name="client"
                                            dispatch={clientDispatch}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Clients;
