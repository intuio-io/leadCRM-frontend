import { useContext } from "react";
import { GlobalContext } from "../context/Provider";
import ClientModal from "./ClientModal";
import { MdClose } from "react-icons/md";
import Select from "react-select";
import { campaignClientSelectStyles } from "../utils/SelectStyles";
import {
    createSupplier,
    createBuyer,
} from "../context/actions/campaignClientActions";
import ButtonLoading from "./ButtonLoading";

const CampaignClientModal = ({ campaignInfo, clients }) => {
    const {
        campaignClientState: {
            show,
            type,
            value,
            errors,
            supplierLoading,
            buyerLoading,
        },
        campaignClientDispatch,
    } = useContext(GlobalContext);

    const { styles, themes } = campaignClientSelectStyles;
    const name = type === "supplier" ? "Supplier" : "Buyer";

    const loading = type === "supplier" ? supplierLoading : buyerLoading;

    // options for the select input
    const options = clients.map((client) => {
        return {
            campaign_id: campaignInfo.id,
            client_id: client.id,
            [`${type}_name`]: client.company_name,
            requests: 0,
            value: client.company_name,
            label: client.company_name,
        };
    });

    // for get the selected value
    const handleChange = (e) => {
        return campaignClientDispatch({
            type: "GET_SELECT_VALUE",
            payload: e,
        });
    };

    const cleanState = () => {
        return campaignClientDispatch({ type: "DEFAULT_STATE" });
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();

        if (type === "supplier") {
            createSupplier(campaignClientDispatch, value);
            return;
        }

        if (type === "buyer") {
            createBuyer(campaignClientDispatch, value);
            return;
        }
    };

    return (
        <>
            <ClientModal />
            <div className={`relative z-50  ${!show && "hidden"}`}>
                <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"></div>

                <div className="fixed mx-4 inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full  justify-center text-center items-center p-0">
                        <div className="relative transform  bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg rounded-lg border">
                            <div className="bg-gray-50 rounded-t-lg">
                                <h1 className="px-5 py-4 text-md text-slate-700 tracking-widest font-bold">
                                    ADD {name?.toUpperCase()}
                                </h1>
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={cleanState}
                                >
                                    <MdClose className="h-6 w-6 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmission}>
                                <div className="px-6 pt-6 pb-6">
                                    <div>
                                        <label
                                            className="block text-slate-600 text-sm tracking-wider font-bold text-md mb-4 pr-10"
                                            htmlFor="name"
                                        >
                                            {name + " "}
                                            <span className="text-red-700">
                                                *
                                            </span>
                                        </label>
                                    </div>

                                    <Select
                                        options={options}
                                        placeholder={`Select ${name}`}
                                        value={value}
                                        onChange={handleChange}
                                        isSearchable
                                        noOptionsMessage={() =>
                                            "no results found"
                                        }
                                        styles={styles(errors)}
                                        theme={themes}
                                    />

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="text-indigo-500 text-xs pt-2 tracking-wide"
                                        >
                                            Create a new Client
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse sm:px-6 rounded-b-lg">
                                    <button
                                        type="submit"
                                        className={`inline-flex justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ml-3 w-auto tracking-wide ${
                                            loading && "cursor-not-allowed"
                                        }`}
                                    >
                                        {loading ? <ButtonLoading /> : "Save"}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-auto tracking-wide"
                                        onClick={cleanState}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CampaignClientModal;
