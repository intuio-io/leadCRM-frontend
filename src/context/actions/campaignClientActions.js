import axios from "axios";
import axiosClient from "../../utils/axios-client";
import { toast } from "react-toastify";
const cancelToken = axios.CancelToken.source();

export const getSuppliers = (campaignClientDispatch, payload, cancelToken) => {
    // start fetching suppliers
    campaignClientDispatch({ type: "SUPPLIER_FETCH_START" });

    // hope he has suppliers
    axiosClient
        .get(`/campaign/suppliers/${payload}`, {
            cancelToken: cancelToken.token,
        })
        .then(({ data }) => {
            campaignClientDispatch({
                type: "SUPPLIER_FETCH_SUCCESS",
                payload: data,
            });
        })
        .catch((err) => {
            if (axios.isCancel(err)) {
                console.log(err.message);
            }
        });
};

export const createSupplier = (campaignClientDispatch, payload) => {
    // start the creation
    campaignClientDispatch({ type: "SUPPLIER_FETCH_START" });

    //hope for everything to be valid
    axiosClient
        .post("/add/supplier", payload, { cancelToken: cancelToken.token })
        .then(({ data }) => {
            toast.success(data.success);
            getSuppliers(
                campaignClientDispatch,
                payload.campaign_id,
                cancelToken
            );
            campaignClientDispatch({ type: "DEFAULT_STATE" });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                toast.error(response.data.message);
                campaignClientDispatch({
                    type: "ERRORS",
                    payload: response.data.message,
                });
            }
        });
};

export const editSupplier = (campaignClientDispatch, payload) => {
    // start updating

    // hope for everything to update successfully
    axiosClient
        .patch("/edit/supplier", payload)
        .then(({ data }) => {
            toast.success(data.success);

            campaignClientDispatch({
                type: "EDIT_CAMPAIGN_CLIENT_FETCH_SUCCESS",
                payload: payload,
            });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                campaignClientDispatch({
                    type: "ERRORS",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const deleteSupplier = (campaignClientDispatch, payload) => {
    // start deleting
    const { rowId } = payload;

    axiosClient
        .delete(`/delete/supplier/${rowId}`)
        .then(() => {
            campaignClientDispatch({ type: "DELETE_SUPPLIER", payload: rowId });
            toast.success("Supplier Deleted Successfully!");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const supplierDetails = (
    campaignClientDispatch,
    payload,
    cancelToken
) => {
    // start fetching supplier details
    const { campaignId, typeId: supplierId } = payload;
    campaignClientDispatch({ type: "SUPPLIER_FETCH_START" });

    axiosClient
        .get(`/supplier/detail/${campaignId}/${supplierId}`, {
            cancelToken: cancelToken.token,
        })
        .then(({ data }) => {
            campaignClientDispatch({
                type: "EDIT_CAMPAIGN_CLIENT_FETCH_SUCCESS",
                payload: data,
            });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 404) {
                toast.error("Invalid or expired URL!");
                campaignClientDispatch({
                    type: "ERRORS",
                    payload: err.response.data.message,
                });
            }
        });
};

// Buyers

export const getBuyers = (campaignClientDispatch, payload, cancelToken) => {
    // start fetching suppliers
    campaignClientDispatch({ type: "BUYER_FETCH_START" });

    // hope he has suppliers
    axiosClient
        .get(`/campaign/buyers/${payload}`, { cancelToken: cancelToken.token })
        .then(({ data }) => {
            campaignClientDispatch({
                type: "BUYER_FETCH_SUCCESS",
                payload: data,
            });
        })
        .catch((err) => {
            if (axios.isCancel(err)) {
                console.log(err.message);
            }
        });
};

export const createBuyer = (campaignClientDispatch, payload) => {
    // start the creation
    campaignClientDispatch({ type: "BUYER_FETCH_START" });

    //hope for everything to be valid
    axiosClient
        .post("/add/buyer", payload)
        .then(({ data }) => {
            toast.success(data.success);
            getBuyers(campaignClientDispatch, payload.campaign_id, cancelToken);
            campaignClientDispatch({ type: "DEFAULT_STATE" });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                toast.error(response.data.message);
                campaignClientDispatch({
                    type: "ERRORS",
                    payload: response.data.message,
                });
            }
        });
};

export const editBuyer = (campaignClientDispatch, payload) => {
    // start updating

    // hope for everything to update successfully
    axiosClient
        .patch("/edit/buyer", payload)
        .then(({ data }) => {
            toast.success(data.success);

            campaignClientDispatch({
                type: "EDIT_CAMPAIGN_CLIENT_FETCH_SUCCESS",
                payload: payload,
            });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                campaignClientDispatch({
                    type: "ERRORS",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const deleteBuyer = (campaignClientDispatch, payload) => {
    // start deleting
    const { rowId } = payload;

    axiosClient
        .delete(`/delete/buyer/${rowId}`)
        .then(() => {
            campaignClientDispatch({ type: "DELETE_BUYER", payload: rowId });
            toast.success("Buyer Deleted Successfully!");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const buyerDetails = (campaignClientDispatch, payload, cancelToken) => {
    // start fetching supplier details
    const { campaignId, typeId: buyerId } = payload;
    campaignClientDispatch({ type: "BUYER_FETCH_START" });

    axiosClient
        .get(`/buyer/detail/${campaignId}/${buyerId}`, {
            cancelToken: cancelToken.token,
        })
        .then(({ data }) => {
            campaignClientDispatch({
                type: "EDIT_CAMPAIGN_CLIENT_FETCH_SUCCESS",
                payload: data,
            });
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 404) {
                toast.error("Invalid or expired URL!");
                campaignClientDispatch({
                    type: "ERRORS",
                    payload: err.response.data.message,
                });
            }
        });
};
