const authReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                loading: true,
            };
        case "FETCH_SUCCESS":
            if (action.payload.token) {
                localStorage.setItem("ACCESS_TOKEN", action.payload.token);
            }
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
            };
        case "FETCH_FAIL":
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };

        case "LOGOUT":
            return {
                ...state,
                user: {},
                token: localStorage.removeItem("ACCESS_TOKEN"),
            };
        default:
            return state;
    }
};

export default authReducer;
