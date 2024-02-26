import axios from "axios";
import axiosClient from "../../utils/axios-client";
import { toast } from "react-toastify";
const cancelToken = axios.CancelToken.source();

export const getClients = (clientDispatch, cancelToken) => {
    // start fetching clients
    clientDispatch({ type: "FETCH_START" });

    axiosClient
        .get("/clients", { cancelToken: cancelToken.token })
        .then(({ data }) => {
            clientDispatch({ type: "FETCH_SUCCESS", payload: data });
        })
        .catch((err) => {
            if (axios.isCancel(err)) {
                console.log(err.message);
            }
        });
};

export const createClient = (clientDispatch, payload) => {
    // start the creation
    clientDispatch({ type: "FETCH_START" });

    // hope for everything to be valid
    axiosClient
        .post("/create/client", payload)
        .then(({ data }) => {
            toast.success(data.success);
            clientDispatch({ type: "DEFAULT_STATE" });
            getClients(clientDispatch, cancelToken);
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                clientDispatch({
                    type: "ADD_FORM_ERRORS",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const editClient = (clientDispatch, payload) => {
    // start updating

    clientDispatch({ type: "FETCH_START" });

    // hope for everything to update successfully
    axiosClient
        .patch("/edit/client", payload)
        .then(({ data }) => {
            toast.success(data.success);
            clientDispatch({ type: "DEFAULT_STATE" });
            getClients(clientDispatch, cancelToken);
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                clientDispatch({
                    type: "ADD_FORM_ERRORS",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const deleteClient = (clientDispatch, payload) => {
    // start deleting
    const { name, rowId } = payload;

    axiosClient
        .delete(`/delete/${name}/${rowId}`)
        .then(() => {
            clientDispatch({ type: "DELETE_CLIENT", payload: rowId });
            toast.success("Client Deleted Successfully!");
        })
        .catch((err) => {
            console.log(err);
        });
};
