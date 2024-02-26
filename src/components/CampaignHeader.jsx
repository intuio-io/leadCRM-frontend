/* eslint-disable react-refresh/only-export-components */
import { Link, useLocation } from "react-router-dom";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { memo, useEffect, useState } from "react";
import { editCampaign } from "../context/actions/campaignActions";

const CampaignHeader = ({
    campaignInfo,
    campaign,
    campaignDispatch,
    type,
    campaignClientInfo,
    nickName,
    campaignClientSubmit,
}) => {
    const [scroll, setScroll] = useState("px-7 py-3 md:ml-48");

    // Location active link purpose
    const location = useLocation();
    const editCampaignUrl = `/campaigns/${campaignInfo?.id}/edit`;

    // header wider once scroll reaches a certain scroll distance
    const listenScrollEvent = () => {
        if (window.scrollY > 100) {
            return setScroll("px-6 md:ml-44 -mx-4 py-4");
        } else if (window.scrollY < 100) {
            return setScroll("px-7 md:ml-48 py-3");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editCampaign(campaignDispatch, campaign);
    };

    return (
        <>
            <div
                className={`flex transition-all justify-between items-center z-40   bg-indigo-500 rounded shadow-lg -mt-52 md:-mt-48 sticky top-0 snap-y ${scroll} `}
            >
                <div className="flex items-center">
                    <Link
                        to="/campaigns"
                        className="border hidden min-[320px]:inline p-1 bg-white rounded-full shadow-md"
                    >
                        <AiOutlineCodeSandbox className="h-8 w-8" />
                    </Link>
                    <div className="ml-3">
                        <Link
                            to="/campaigns"
                            className="text-white px-3 py-2 transition-all hover:shadow-sm text-md rounded-lg hover:bg-indigo-400 hidden md:inline tracking-wide"
                        >
                            Campaigns
                        </Link>
                    </div>
                    <div className="mr-2 hidden min-[320px]:inline">
                        <MdKeyboardArrowRight className="h-7 w-7 text-indigo-200" />
                    </div>

                    <div
                        className={`px-3 p-2 tracking-wider font-bold hover:bg-indigo-400 rounded-lg transition-all ${
                            location.pathname === editCampaignUrl &&
                            "bg-indigo-400 rounded-lg shadow-sm"
                        }`}
                    >
                        <Link
                            to={editCampaignUrl}
                            className="text-white leading-1 mouse-pointer"
                        >
                            <p>
                                <span className="hidden lg:inline">
                                    {campaignInfo?.id} :{" "}
                                </span>
                                {campaignInfo?.campaign_name}
                            </p>
                        </Link>
                    </div>

                    {type && (
                        <div className="flex items-center gap-2 ml-3">
                            <div>
                                <MdKeyboardArrowRight className="h-7 w-7 text-indigo-200" />
                            </div>
                            <Link className="px-3 p-2 rounded-lg bg-indigo-400 shadow-sm">
                                <div className="text-white leading-1 mouse-pointer font-bold tracking-wider">
                                    <p>
                                        <span className="hidden lg:inline">
                                            {campaignClientInfo.id} :{" "}
                                        </span>
                                        {campaignClientInfo[`${type}_name`]}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                <div>
                    {campaign?.campaign_name !==
                        campaignInfo?.campaign_name && (
                        <button
                            className="text-md px-2 py-1.5 rounded-full md:rounded-md bg-white text-green-600 flex items-center gap-2 shadow-sm hover:bg-slate-100"
                            onClick={handleSubmit}
                        >
                            <FaSave className="h-6 w-6" />
                            <span className="hidden md:block">Save</span>
                        </button>
                    )}

                    {nickName?.[`${type}_nickname`] !==
                        campaignClientInfo?.[`${type}_nickname`] && (
                        <button
                            className="text-md px-2 py-1.5 rounded-full md:rounded-md bg-white text-green-600 flex items-center gap-2 shadow-sm hover:bg-slate-100"
                            onClick={campaignClientSubmit}
                        >
                            <FaSave className="h-6 w-6" />
                            <span className="hidden md:block">Save</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default memo(CampaignHeader);
