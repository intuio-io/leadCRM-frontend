import { useContext } from "react";
import { GlobalContext } from "../context/Provider";

const CampaignBasicInfo = ({ campaign, campaignDispatch }) => {
    const {
        campaignState: { errors },
    } = useContext(GlobalContext);
    return (
        <>
            <div className="md:ml-48 bg-white rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  m-auto mt-4">
                <div>
                    <h1 className="p-4 text-md text-slate-700 tracking-widest font-bold">
                        CAMPAIGN BASIC INFO
                    </h1>
                </div>

                <hr className="h-px bg-gray-200 border-0" />
                <div className="p-4">
                    <form className="md:max-w-md">
                        <div className="md:flex md:items-center mb-6">
                            <div>
                                <label
                                    className="block text-slate-900 text-md mb-1 md:mb-0 pr-10"
                                    htmlFor="name"
                                >
                                    Name <span className="text-red-700">*</span>
                                </label>
                            </div>
                            <div>
                                <input
                                    className={`appearance-none border-2 border-gray-200 rounded w-full md:w-72 py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-200 ${
                                        errors && "border-red-500"
                                    }`}
                                    id="name"
                                    name="campaign_name"
                                    type="text"
                                    value={campaign.campaign_name}
                                    onChange={(e) =>
                                        campaignDispatch({
                                            type: "UPDATE_CAMPAIGN",
                                            payload: {
                                                name: e.target.name,
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CampaignBasicInfo;
