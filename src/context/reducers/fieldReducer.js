/* eslint-disable no-case-declarations */
import { initialFieldState } from "../initialstates/initialFieldState";

const fieldReducer = (state, action) => {
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
                fields: action.payload,
            };
        case "DELETE_FIELD":
            return {
                ...state,
                fields: state.fields.filter(
                    (field) => field.id !== action.payload
                ),
            };
        case "OPEN_RESET_MODAL":
            return {
                ...state,
                showResetModal: true,
            };

        case "CLOSE_RESET_MODAL":
            return {
                ...state,
                showResetModal: false,
            };

        // Field Form
        case "OPEN_FIELD_MODAL":
            return {
                ...state,
                showFieldForm: true,
            };

        case "CHANGE_INPUT":
            return {
                ...state,
                field: {
                    ...state.field,
                    [action.payload.name]: action.payload.value,
                },
            };

        case "GET_SELECT_VALUE":
            return {
                ...state,
                selectedValue: action.payload,
            };

        case "UPDATE_CAMPAIGN_ID":
            return {
                ...state,
                field: {
                    ...state.field,
                    ["campaign_id"]: action.payload,
                },
            };

        case "ERRORS":
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        case "FORM_UPDATE":
            let label = null;
            switch (action.payload.field_type) {
                case "Int":
                    label = "number";
                    break;
                case "String":
                    label = "text";
                    break;
                case "Email":
                    label = "email";
                    break;
                default:
                    // Handle the case when the field_type is not one of the specified values
                    break;
            }

            return {
                ...state,
                edit: true,
                showFieldForm: true,
                field: { ...state.field, ...action.payload },
                selectedValue: {
                    value: action.payload.field_type,
                    label: label,
                },
            };

        case "DEFAULT_STATE":
            return {
                ...state,
                field: initialFieldState.field,
                selectedValue: null,
                showFieldForm: false,
                showResetModal: false,
                edit: false,
                loading: false,
                errors: null,
            };
        default:
            return state;
    }
};

export default fieldReducer;
