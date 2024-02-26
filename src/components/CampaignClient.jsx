import DataTable from "react-data-table-component";
import { BiPlusMedical } from "react-icons/bi";
import { CampaignClientTable } from "../utils/TableStyles";
import { clientStyles, conditionalClientStyles } from "../utils/TableStyles";
import ClientMenu from "./ClientMenu";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import {
    getSuppliers,
    getBuyers,
} from "../context/actions/campaignClientActions";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

const CampaignClient = ({ type, campaignId }) => {
    const {
        campaignClientState: {
            suppliers,
            supplierLoading,
            buyers,
            buyerLoading,
        },
        campaignClientDispatch,
    } = useContext(GlobalContext);

    // For giving the table gray white theme
    const clients = (type === "supplier" ? suppliers : buyers).map(
        (data, index) => {
            return { ...data, num: index + 1 };
        }
    );

    const loading = type === "supplier" ? supplierLoading : buyerLoading;

    // Data table columns requirement
    const column = CampaignClientTable(type);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        if (type === "supplier") {
            getSuppliers(campaignClientDispatch, campaignId, cancelToken);
        }
        if (type === "buyer") {
            getBuyers(campaignClientDispatch, campaignId, cancelToken);
        }

        return () => {
            cancelToken.cancel("Operation cancelled for campaign client");
        };
    }, [type, campaignClientDispatch, campaignId]);

    return (
        <>
            <div className="md:ml-48 bg-white rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  m-auto mt-4">
                <div className="flex justify-between p-4 items-center">
                    <div>
                        <h1 className="text-md text-slate-700 tracking-widest font-bold">
                            {type === "supplier" ? "SUPPLIER" : "BUYER"}
                        </h1>
                    </div>

                    <div>
                        <button
                            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-700 text-white tracking-wide  py-2 px-3 rounded text-sm"
                            onClick={() =>
                                campaignClientDispatch({
                                    type: "OPEN_MODAL",
                                    payload: type,
                                })
                            }
                        >
                            <BiPlusMedical className="w-4 h-4" />
                            New
                        </button>
                    </div>
                </div>

                <hr className="h-px bg-gray-200 border-0" />

                <div className="relative flex justify-end ">
                    <DataTable
                        columns={column}
                        data={clients}
                        progressPending={loading}
                        progressComponent={<LoadingSpinner />}
                        conditionalRowStyles={conditionalClientStyles}
                        customStyles={clientStyles}
                        responsive
                    />

                    <div
                        className={`absolute bg-white shadow-[-5px_0_7px_-5px_rgba(0,0,0,0.1)] ${
                            (supplierLoading || buyerLoading) && "hidden"
                        }`}
                    >
                        <div className="mt-[3.25rem]">
                            {clients.map((row) => {
                                let color =
                                    row.num % 2 !== 0
                                        ? "bg-[#f4f6f7] "
                                        : "bg-[#FFFFFF]";
                                return (
                                    <div
                                        className={`px-3 h-16 flex items-center ${color}`}
                                        key={row.id}
                                    >
                                        <ClientMenu row={row} name={type} />
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

export default CampaignClient;
