/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";

const Search = ({ state, Dispatch }) => {
    const handleFilter = (event) => {
        const newData = state.filter((row) => {
            const type = row.company_name || row.campaign_name;
            return type
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        Dispatch({ type: "FILTER_RECORDS", payload: newData });
    };
    return (
        <>
            <div className="flex gap-2">
                <input
                    type="text"
                    onChange={handleFilter}
                    className="border-slate-300 w-64 appearance-none border rounded py-2.5 px-3 text-gray-700 focus:outline-none text-base"
                    placeholder="Search by company"
                />

                <button
                    type="button"
                    className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-base"
                    onClick={() => Dispatch({ type: "OPEN_MODAL" })}
                >
                    Add
                </button>
            </div>
        </>
    );
};

export default memo(Search);
