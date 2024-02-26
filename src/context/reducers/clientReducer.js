/* eslint-disable no-case-declarations */
import { initialClientState } from "../initialstates/initialClientState";

const clientReducer = (state, action) => {
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
                clients: action.payload,
                records: action.payload,
            };
        case "FILTER_RECORDS":
            return {
                ...state,
                records: action.payload,
            };
        case "DELETE_CLIENT":
            return {
                ...state,
                records: state.records.filter(
                    (record) => record.id !== action.payload
                ),
            };

        // CLient Form
        case "OPEN_MODAL":
            return {
                ...state,
                show: true,
            };
        case "CHANGE_INPUT":
            return {
                ...state,
                client: {
                    ...state.client,
                    [action.payload.name]: action.payload.value,
                },
            };
        case "ADD_FORM_ERRORS":
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case "FORM_UPDATE":
            return {
                ...state,
                edit: true,
                show: true,
                client: { ...state.client, ...action.payload },
            };
        case "DEFAULT_STATE":
            return {
                ...state,
                client: initialClientState.client,
                show: false,
                edit: false,
                errors: false,
            };
        default:
            return state;
    }
};

export default clientReducer;
