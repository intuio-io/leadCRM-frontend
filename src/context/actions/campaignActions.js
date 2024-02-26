import axios from "axios";
import axiosClient from "../../utils/axios-client";
import { toast } from "react-toastify";
const cancelToken = axios.CancelToken.source();

export const getCampaigns = (campaignDispatch, cancelToken) => {
    // start fetching campaigns

    campaignDispatch({ type: "FETCH_START" });

    axiosClient
        .get("/campaigns", { cancelToken: cancelToken.token })
        .then(({ data }) => {
            campaignDispatch({ type: "FETCH_SUCCESS", payload: data });
        })
        .catch((err) => {
            if (axios.isCancel(err)) {
                console.log(err.message);
            }
        });
};

export const createCampaign = (campaignDispatch, payload) => {
    // start the creation
    campaignDispatch({ type: "FETCH_START" });

    //hope for everything to be valid
    axiosClient
        .post("/create/campaign", payload)
        .then(({ data }) => {
            toast.success(data.success);
            campaignDispatch({ type: "DEFAULT_STATE" });
            getCampaigns(campaignDispatch, cancelToken);
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                campaignDispatch({
                    type: "FORM_ERRORS",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const editCampaign = (campaignDispatch, payload) => {
    // start updating

    // hope for everything to update successfully
    axiosClient
        .patch("/edit/campaign", payload)
        .then(({ data }) => {
            toast.success(data.success);
            console.log(payload);
            campaignDispatch({
                type: "DETAILS_FETCH_SUCCESS",
                payload: payload,
            });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                campaignDispatch({
                    type: "FORM_ERRORS",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const deleteCampaign = (campaignDispatch, payload) => {
    // start deleting
    const { rowId } = payload;

    axiosClient
        .delete(`/delete/campaign/${rowId}`)
        .then(() => {
            campaignDispatch({ type: "DELETE_CAMPAIGN", payload: rowId });
            toast.success("Campaign Deleted Successfully!");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const campaignDetails = (campaignDispatch, id, cancelToken) => {
    // start fetching campaign details
    campaignDispatch({ type: "FETCH_START" });

    axiosClient
        .get(`/campaign/details/${id}`, { cancelToken: cancelToken.token })
        .then(({ data }) => {
            campaignDispatch({
                type: "DETAILS_FETCH_SUCCESS",
                payload: data,
            });
        })
        .catch((err) => {
            const response = err.response;
            if (axios.isCancel(err)) {
                console.log(err.message);
            } else if (response && response.status === 422) {
                campaignDispatch({
                    type: "FORM_ERRORS",
                    payload: err.response.data.message,
                });
            }
        });
};
