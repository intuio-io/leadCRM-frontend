import { toast } from "react-toastify";
import axiosClient from "../../utils/axios-client";
import axios from "axios";
const cancelToken = axios.CancelToken.source();

export const getFilters = (filterDispatch, payload, cancelToken) => {
    // start fetching filters
    filterDispatch({ type: "FETCH_START" });

    // hope he has filters
    axiosClient
        .get(`/campaign/filters/${payload}`, { cancelToken: cancelToken.token })
        .then(({ data }) => {
            filterDispatch({ type: "FETCH_SUCCESS", payload: data });
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

export const createFilter = (filterDispatch, payload) => {
    // start the creation
    filterDispatch({ type: "FETCH_START" });

    // hope for everything to be valid
    axiosClient
        .post("/add/filter", payload)
        .then(({ data }) => {
            toast.success(data.success);
            getFilters(filterDispatch, payload.campaign_id, cancelToken);
            filterDispatch({ type: "DEFAULT_STATE" });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                toast.error(response.data.message);
                filterDispatch({
                    type: "ERRORS",
                    payload: response.data.errors,
                });
            }
        });
};

export const editFilter = (filterDispatch, payload) => {
    // start updating
    filterDispatch({ type: "FETCH_START" });

    // hope for everything to update successfully
    axiosClient
        .patch("/edit/filter", payload)
        .then(({ data }) => {
            toast.success(data.success);
            filterDispatch({ type: "DEFAULT_STATE" });
            getFilters(filterDispatch, payload.campaign_id, cancelToken);
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                filterDispatch({
                    type: "ERRORS",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const deleteFilter = (filterDispatch, payload) => {
    // start deleting
    const { rowId } = payload;

    axiosClient
        .delete(`/delete/filter/${rowId}`)
        .then(() => {
            filterDispatch({ type: "DELETE_FILTER", payload: rowId });
            toast.success("Client Deleted Successfully!");
        })
        .catch((err) => {
            console.log(err);
        });
};
