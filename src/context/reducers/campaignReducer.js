import { initialCampaignState } from "../initialstates/initialCampaignState";

const campaignReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true };

        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                campaigns: action.payload,
                records: action.payload,
            };

        case "FILTER_RECORDS":
            return {
                ...state,
                records: action.payload,
            };

        case "DELETE_CAMPAIGN":
            return {
                ...state,
                records: state.records.filter(
                    (record) => record.id !== action.payload
                ),
            };
        case "DETAILS_FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                campaignInfo: {
                    ...action.payload,
                },
                editCampaign: {
                    ...action.payload,
                },
            };
        case "UPDATE_CAMPAIGN":
            return {
                ...state,
                editCampaign: {
                    ...state.editCampaign,
                    [action.payload.name]: action.payload.value,
                },
            };

        // campaign Form
        case "OPEN_MODAL":
            return {
                ...state,
                show: true,
            };

        case "CHANGE_INPUT":
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    [action.payload.name]: action.payload.value,
                },
            };

        case "FORM_ERRORS":
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        case "DEFAULT_STATE":
            return {
                ...state,
                campaign: initialCampaignState.campaign,
                show: false,
                errors: null,
                loading: false,
            };

        default:
            return state;
    }
};

export default campaignReducer;
