import {
    CampaignHeader,
    CampaignBasicInfo,
    CampaignClient,
    CampaignClientModal,
    CampaignFields,
    CampaignFilter,
} from "../components";
import { useCallback, useContext, useLayoutEffect } from "react";
import { GlobalContext } from "../context/Provider";
import { campaignDetails } from "../context/actions/campaignActions";
import { LoadingSpinner } from "../components";
import { useParams } from "react-router-dom";
import { getClients } from "../context/actions/clientActions";
import axios from "axios";

const EditCampaign = () => {
    const { id } = useParams();

    const {
        campaignState: { campaignInfo, editCampaign, loading },
        campaignDispatch,
        clientState: { clients },
        clientDispatch,
    } = useContext(GlobalContext);

    const fetchEditCampaignData = useCallback(
        async (cancelToken) => {
            try {
                await Promise.all([
                    campaignDetails(campaignDispatch, id, cancelToken),
                    getClients(clientDispatch, cancelToken),
                ]);
            } catch (error) {
                console.log(error);
            }
        },
        [campaignDispatch, clientDispatch, id]
    );

    useLayoutEffect(() => {
        const cancelToken = axios.CancelToken.source();
        fetchEditCampaignData(cancelToken);
        return () => {
            cancelToken.cancel("Operation cancelled in edit Campaign");
        };
    }, [fetchEditCampaignData]);

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
            />
            <CampaignBasicInfo
                campaign={editCampaign}
                campaignDispatch={campaignDispatch}
            />

            {/* Campaign suppliers and buyers */}
            <div>
                <CampaignClientModal
                    campaignInfo={campaignInfo}
                    clients={clients}
                />
                <CampaignClient type="supplier" campaignId={id} />
                <CampaignClient type="buyer" campaignId={id} />
            </div>

            {/* Campaign Attributes */}
            <div>
                <CampaignFields campaignId={id} />
            </div>

            {/* Filter leads */}
            <div>
                <CampaignFilter campaignId={id} />
            </div>
        </>
    );
};

export default EditCampaign;
