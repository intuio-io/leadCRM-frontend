export const initialAuthState = {
    user: {},
    loading: false,
    errors: null,
    token: localStorage.getItem("ACCESS_TOKEN"),
};
