import { MdClose } from "react-icons/md";
import { createCampaign } from "../context/actions/campaignActions";
import { useContext } from "react";
import { GlobalContext } from "../context/Provider";
import ButtonLoading from "./ButtonLoading";

const CampaignModal = () => {
    const {
        campaignState: { campaign, show, errors, loading },
        campaignDispatch,
    } = useContext(GlobalContext);

    const handleChange = (e) => {
        campaignDispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        createCampaign(campaignDispatch, campaign);
    };
    return (
        <>
            <div className={`relative z-50 ${!show && "hidden"}`}>
                <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"></div>

                <div className="fixed mx-4 inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full  justify-center text-center items-center p-0">
                        <div className="relative transform  bg-white text-left shadow-xl transition-all my-8 w-full max-w-[34rem] overflow-hidden rounded-lg border">
                            <div className="bg-gray-50 rounded-t-lg">
                                <h1 className="px-5 py-4 text-md text-slate-700 tracking-widest font-bold">
                                    ADD CAMPAIGN
                                </h1>
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    data-modal-hide="authentication-modal"
                                    onClick={() =>
                                        campaignDispatch({
                                            type: "DEFAULT_STATE",
                                        })
                                    }
                                >
                                    <MdClose className="h-6 w-6 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmission}>
                                <div className="gap-6 px-5 my-7">
                                    <div>
                                        <label
                                            className="block text-slate-600 text-sm tracking-wider font-bold mb-1 md:mb-4 pr-10"
                                            htmlFor="campaign_name"
                                        >
                                            Campaign name{" "}
                                            <span className="text-red-700">
                                                *
                                            </span>
                                        </label>
                                    </div>
                                    <input
                                        className={`appearance-none border-[1.9px] border-gray-200 rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white
                                          focus:border-indigo-200 ${
                                              errors?.campaign_name &&
                                              "border-red-500"
                                          }`}
                                        id="campaign_name"
                                        type="text"
                                        name="campaign_name"
                                        placeholder="Enter campaign name"
                                        value={campaign.campaign_name}
                                        onChange={handleChange}
                                    />

                                    <p
                                        className={`text-xs mt-1 tracking-wide ${
                                            errors?.campaign_name
                                                ? "text-red-500"
                                                : "text-slate-500"
                                        } text-xs italic`}
                                    >
                                        {errors?.campaign_name
                                            ? errors.campaign_name
                                            : "Name your campaign so you can easily recognize it"}
                                    </p>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse">
                                    <button
                                        disabled={loading}
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
                                        onClick={() =>
                                            campaignDispatch({
                                                type: "DEFAULT_STATE",
                                            })
                                        }
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

export default CampaignModal;
