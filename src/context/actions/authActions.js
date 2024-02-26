import axiosClient from "../../utils/axios-client";
import { toast } from "react-toastify";

export const signup = (authDispatch, payload) => {
    // starts the registration
    authDispatch({ type: "FETCH_START" });

    // hope for success or set errors
    axiosClient
        .post("/signup", payload)
        .then(({ data }) => {
            authDispatch({
                type: "FETCH_SUCCESS",
                payload: {
                    user: data.user,
                    token: data.token,
                },
            });

            toast.success("Your Successfully Registered!");
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                authDispatch({
                    type: "FETCH_FAIL",
                    payload: response.data.errors,
                });
                toast.error(response.data.message);
            }
        });
};

export const login = (authDispatch, payload) => {
    // starts the login
    authDispatch({ type: "FETCH_START" });

    // hope for credentials to match or fail
    axiosClient
        .post("/login", payload)
        .then(({ data }) => {
            authDispatch({
                type: "FETCH_SUCCESS",
                payload: {
                    user: data.user,
                    token: data.token,
                },
            });
            toast.success(`Welcome back ${data.user.first_name}!`);
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    authDispatch({
                        type: "FETCH_FAIL",
                        payload: response.data.errors,
                    });
                } else {
                    authDispatch({
                        type: "FETCH_FAIL",
                        payload: {
                            email: [response.data.message],
                            password: [response.data.message],
                        },
                    });
                }
                toast.error(response.data.message);
            }
        });
};

export const updateToken = (authDispatch) => {
    axiosClient
        .post("/refresh")
        .then(({ data }) => {
            authDispatch({
                type: "FETCH_SUCCESS",
                payload: {
                    user: data.user,
                    token: data.token,
                },
            });

            console.log("UPDATED NEW TOKEN");
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.state === 401) {
                authDispatch({ type: "LOGOUT" });
            }
        });
};
