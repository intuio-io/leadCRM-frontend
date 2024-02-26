import axiosClient from "../../utils/axios-client";

export const getLeads = (leadDispatch, payload) => {
    // start fetching leads
    leadDispatch({ type: "FETCH_START" });

    // hope he has leads
    axiosClient
        .get(`/leads/${payload}`)
        .then(({ data }) => {
            leadDispatch({ type: "FETCH_SUCCESS", payload: data });
        })
        .catch((err) => {
            console.log(err);
        });
};
