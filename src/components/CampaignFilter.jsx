import { useContext, useEffect } from "react";
import { getFilters } from "../context/actions/filterActions";
import { GlobalContext } from "../context/Provider";
import DataTable from "react-data-table-component";
import { BiPlusMedical } from "react-icons/bi";
import { filterColumns, fieldStyles } from "../utils/TableStyles";
import {
    LoadingSpinner,
    AllRounderMenu,
    CampaignFilterModal,
} from "../components";
import axios from "axios";

const CampaignFilter = ({ campaignId }) => {
    const {
        filterState: { loading, filters },
        filterDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        getFilters(filterDispatch, campaignId, cancelToken);

        return () => {
            cancelToken.cancel("Operation cancelled for the campaign filter");
        };
    }, [filterDispatch, campaignId]);

    return (
        <>
            <CampaignFilterModal campaignId={campaignId} />
            <div className="md:ml-48 bg-white rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  m-auto mt-4 pb-4">
                <div className="flex justify-between p-4 items-center">
                    <div>
                        <h1 className="text-md text-slate-700 tracking-widest font-bold">
                            FILTERS
                        </h1>
                    </div>
                </div>
                <hr className="h-px bg-gray-200 border-0" />

                <div className="border-[1.5px] mx-6 bg-white rounded m-auto mt-4 pb-4">
                    <div className="flex justify-between p-4 items-center">
                        <div>
                            <h1 className="text-md text-slate-700 tracking-widest font-bold">
                                GLOBAL
                            </h1>
                        </div>
                    </div>
                    <div className="border-[1.5px] mx-4 bg-gray-50 rounded m-auto mt-1">
                        <div className="flex justify-between py-2 px-3 items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-500 w-fit rounded-full">
                                    <h1 className="text-sm font-bold py-1 px-[0.570rem]  text-white">
                                        G
                                    </h1>
                                </div>

                                <h1 className="text-sm hidden sm:block font-extrabold text-slate-700 tracking-wider">
                                    GLOBAL FILTER
                                </h1>
                            </div>
                            <div>
                                <h1 className="font-bold text-slate-400 tracking-wider">
                                    {filters?.length == 0 ? "NO FILTERS" : ""}
                                </h1>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="flex items-center  gap-2 bg-indigo-500 hover:bg-indigo-700 text-white tracking-wide  py-2 px-3 rounded text-sm"
                                    onClick={() =>
                                        filterDispatch({
                                            type: "OPEN_FILTER_MODAL",
                                        })
                                    }
                                >
                                    <BiPlusMedical className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="relative flex justify-end">
                            <DataTable
                                columns={filterColumns}
                                data={filters}
                                progressPending={loading}
                                progressComponent={<LoadingSpinner />}
                                noDataComponent
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
                                    {filters.map((row) => {
                                        return (
                                            <div
                                                className={`px-3 h-12 flex items-center`}
                                                key={row.id}
                                            >
                                                <AllRounderMenu
                                                    row={row}
                                                    name="filter"
                                                    dispatch={filterDispatch}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CampaignFilter;
