import { initialFilterState } from "../initialstates/initialFilterState";

const filterReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                loading: true,
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                filters: action.payload,
            };
        case "DELETE_FILTER":
            return {
                ...state,
                filters: state.filters.filter(
                    (filter) => filter.id !== action.payload
                ),
            };
        case "OPEN_FILTER_MODAL":
            return {
                ...state,
                showFilterForm: true,
            };

        // Filter form

        case "CHANGE_INPUT":
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.name]: action.payload.value,
                },
            };

        case "GET_SELECT_VALUE":
            return {
                ...state,
                selectedValue: action.payload,
            };

        case "ERRORS":
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        case "UPDATE_CAMPAIGN_ID":
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ["campaign_id"]: action.payload,
                },
            };

        case "FORM_UPDATE":
            return {
                ...state,
                edit: true,
                showFilterForm: true,
                filter: { ...state.filter, ...action.payload },
                selectedValue: {
                    value: action.payload.filter_type,
                    label: action.payload.filter_type,
                },
            };

        case "DEFAULT_STATE":
            return {
                ...state,
                filter: initialFilterState.filter,
                selectedValue: null,
                showFilterForm: false,
                edit: false,
                loading: false,
                errors: null,
            };
        default:
            return state;
    }
};

export default filterReducer;
