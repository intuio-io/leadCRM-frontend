import { useContext, useEffect } from "react";
import { getFields } from "../context/actions/fieldActions";
import { GlobalContext } from "../context/Provider";
import DataTable from "react-data-table-component";
import { BiPlusMedical } from "react-icons/bi";
import { MdOutlineRefresh } from "react-icons/md";
import { fieldStyles, fieldColumns } from "../utils/TableStyles";
import {
    LoadingSpinner,
    AllRounderMenu,
    ResetModal,
    CampaignFieldModal,
} from "../components";
import axios from "axios";

const CampaignFields = ({ campaignId }) => {
    const {
        fieldState: { loading, fields },
        fieldDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        getFields(fieldDispatch, campaignId, cancelToken);

        return () => {
            cancelToken.cancel("Operation cancelled for the campaign field");
        };
    }, [fieldDispatch, campaignId]);

    return (
        <>
            <ResetModal campaignId={campaignId} />
            <CampaignFieldModal campaignId={campaignId} />
            <div className="md:ml-48 bg-white rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  m-auto mt-4">
                <div className="flex justify-between p-4 items-center">
                    <div>
                        <h1 className="text-md text-slate-700 tracking-widest font-bold">
                            CAMPAIGN FIELDS
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="flex items-center gap-2 border shadow border-gray-400 text-gray-600 bg-white hover:bg-gray-100  tracking-wide  py-2 px-3 rounded text-sm"
                            onClick={() =>
                                fieldDispatch({ type: "OPEN_RESET_MODAL" })
                            }
                        >
                            <MdOutlineRefresh className="w-5 h-5" />
                            Reset
                        </button>
                        <button
                            className="flex items-center  gap-2 bg-indigo-500 hover:bg-indigo-700 text-white tracking-wide  py-2 px-3 rounded text-sm"
                            onClick={() =>
                                fieldDispatch({ type: "OPEN_FIELD_MODAL" })
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
                        columns={fieldColumns}
                        data={fields}
                        progressPending={loading}
                        progressComponent={<LoadingSpinner />}
                        responsive
                        selectableRowsHighlight
                        highlightOnHover
                        customStyles={fieldStyles}
                    />

                    <div className="flex justify-end items-end">
                        <div
                            className={`absolute  bg-white shadow-[-5px_0_7px_-5px_rgba(0,0,0,0.1)] top-[3.25rem] ${
                                loading && "hidden"
                            }`}
                        >
                            {fields.map((row) => {
                                return (
                                    <div
                                        className={`px-3 h-12 flex items-center`}
                                        key={row.id}
                                    >
                                        <AllRounderMenu
                                            row={row}
                                            name="attribute"
                                            dispatch={fieldDispatch}
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

export default CampaignFields;
