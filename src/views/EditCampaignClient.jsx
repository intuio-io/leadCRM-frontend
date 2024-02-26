import { useParams } from "react-router-dom";
import { ContentNotFound } from "../components";
import { useCallback, useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import { campaignDetails } from "../context/actions/campaignActions";
import { LoadingSpinner } from "../components";
import {
    supplierDetails,
    buyerDetails,
    editSupplier,
    editBuyer,
} from "../context/actions/campaignClientActions";
import { CampaignHeader } from "../components";
import axios from "axios";

const EditCampaignClient = () => {
    const { campaignId, type, typeId } = useParams();
    const {
        campaignState: {
            campaignInfo,
            editCampaign,
            loading,
            errors: campaignErrors,
        },
        campaignDispatch,
        campaignClientState: {
            campaignClientInfo,
            errors: clientErrors,
            nickName,
        },
        campaignClientDispatch,
    } = useContext(GlobalContext);

    // supplier Detail fetch
    const fetchSupplierData = useCallback(
        async (cancelToken) => {
            try {
                await Promise.all([
                    supplierDetails(
                        campaignClientDispatch,
                        {
                            campaignId,
                            typeId,
                        },
                        cancelToken
                    ),
                    campaignDetails(campaignDispatch, campaignId, cancelToken),
                ]);
            } catch (error) {
                console.log(error);
            }
        },
        [campaignClientDispatch, campaignDispatch, campaignId, typeId]
    );

    // buyer Detail fetch
    const fetchBuyerData = useCallback(
        async (cancelToken) => {
            try {
                await Promise.all([
                    buyerDetails(
                        campaignClientDispatch,
                        {
                            campaignId,
                            typeId,
                        },
                        cancelToken
                    ),
                    campaignDetails(campaignDispatch, campaignId, cancelToken),
                ]);
            } catch (error) {
                console.log(error);
            }
        },
        [campaignClientDispatch, campaignDispatch, campaignId, typeId]
    );

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        if (type === "supplier") {
            fetchSupplierData(cancelToken);
        }

        if (type === "buyer") {
            fetchBuyerData(cancelToken);
        }

        return () => {
            cancelToken.cancel("Operation cancelled on edit campaign client");
        };
    }, [fetchSupplierData, fetchBuyerData, type]);

    // For invalid inputs in the URL params
    if (
        (type !== "supplier" && type !== "buyer") ||
        campaignErrors ||
        clientErrors
    ) {
        return (
            <>
                <ContentNotFound />
            </>
        );
    }

    const campaignClientSubmit = (e) => {
        e.preventDefault();
        if (type === "supplier") {
            editSupplier(campaignClientDispatch, nickName);
        }

        if (type === "buyer") {
            editBuyer(campaignClientDispatch, nickName);
        }
    };

    return loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
            <LoadingSpinner />
        </div>
    ) : (
        <>
            <CampaignHeader
                campaignInfo={campaignInfo}
                campaign={editCampaign}
                campaignDispatch={campaignDispatch}
                type={type}
                campaignClientInfo={campaignClientInfo}
                nickName={nickName}
                campaignClientSubmit={campaignClientSubmit}
            />
            <div className="md:ml-48 bg-white rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  m-auto mt-4">
                <div>
                    <h1 className="p-4 text-md text-slate-700 tracking-widest font-bold">
                        GENERAL INFO
                    </h1>
                </div>

                <hr className="h-px bg-gray-200 border-0" />
                <div className="p-4">
                    <form>
                        <div className="lg:flex items-center justify-center gap-10">
                            <div className="xl:flex md:items-center md:justify-between mb-6 lg:w-1/2 ">
                                <div>
                                    <label className="block text-slate-900 text-md mb-1 md:mb-2 pr-10">
                                        {type}{" "}
                                        <span className="text-red-700">*</span>
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        className="appearance-none border-2 border-gray-200 rounded w-full xl:w-80 py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-200"
                                        name="campaign_name"
                                        type="text"
                                        value={
                                            campaignClientInfo[`${type}_name`]
                                        }
                                        disabled
                                    />
                                    <button
                                        type="button"
                                        className="text-indigo-500 text-xs  absolute right-0 -bottom-5 tracking-wide"
                                    >
                                        Create new client
                                    </button>
                                </div>
                            </div>

                            <div className="xl:flex md:items-center mb-6 lg:w-1/2 md:justify-between">
                                <div>
                                    <label className="block text-slate-900 text-md mb-1 md:mb-2 pr-10">
                                        nickname
                                    </label>
                                </div>
                                <div className="relative ">
                                    <input
                                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-200 xl:w-80"
                                        name={`${type}_nickname`}
                                        type="text"
                                        value={
                                            nickName[`${type}_nickname`] || ""
                                        }
                                        onChange={(e) => {
                                            campaignClientDispatch({
                                                type: "UPDATE_NICKNAME",
                                                payload: {
                                                    name: e.target.name,
                                                    value: e.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <p className="text-slate-500 text-xs  absolute left-0 -bottom-5 tracking-wide">
                                        Leave empty for no nickname.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditCampaignClient;
