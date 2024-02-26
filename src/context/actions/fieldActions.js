import { toast } from "react-toastify";
import axiosClient from "../../utils/axios-client";
import axios from "axios";
const cancelToken = axios.CancelToken.source();

export const getFields = (fieldDispatch, payload, cancelToken) => {
    // start fetching fields
    fieldDispatch({ type: "FETCH_START" });

    // hope he has fields
    axiosClient
        .get(`/campaign/attributes/${payload}`, {
            cancelToken: cancelToken.token,
        })
        .then(({ data }) => {
            fieldDispatch({ type: "FETCH_SUCCESS", payload: data });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 404) {
                toast.error("Invalid Request 404");
            } else if (axios.isCancel(err)) {
                console.log(err.message);
            }
        });
};

export const createField = (fieldDispatch, payload) => {
    // start the creation
    fieldDispatch({ type: "FETCH_START" });

    //hope for everything to be valid
    axiosClient
        .post("/add/attribute", payload)
        .then(({ data }) => {
            toast.success(data.success);
            getFields(fieldDispatch, payload.campaign_id, cancelToken);
            fieldDispatch({ type: "DEFAULT_STATE" });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                toast.error(response.data.message);
                fieldDispatch({
                    type: "ERRORS",
                    payload: response.data.errors,
                });
            }
        });
};

export const editField = (fieldDispatch, payload) => {
    // start updating
    fieldDispatch({ type: "FETCH_START" });

    // hope for everything to update successfully
    axiosClient
        .patch("/edit/attribute", payload)
        .then(({ data }) => {
            toast.success(data.success);
            fieldDispatch({ type: "DEFAULT_STATE" });
            getFields(fieldDispatch, payload.campaign_id, cancelToken);
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                fieldDispatch({
                    type: "ERRORS",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const deleteField = (fieldDispatch, payload) => {
    // start deleting
    const { rowId } = payload;

    axiosClient
        .delete(`/delete/attribute/${rowId}`)
        .then(() => {
            fieldDispatch({ type: "DELETE_FIELD", payload: rowId });
            toast.success("Client Deleted Successfully!");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const resetField = (fieldDispatch, payload) => {
    // start deleting
    const { campaignId } = payload;

    axiosClient
        .post(`/reset/attributes/${campaignId}`)
        .then(({ data }) => {
            getFields(fieldDispatch, campaignId, cancelToken);
            fieldDispatch({ type: "CLOSE_RESET_MODAL" });
            toast.success(data.success);
        })
        .catch((err) => {
            console.log(err);
        });
};
