const leadReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                loadingLeads: true,
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loadingLeads: false,
                leads: action.payload,
            };

        case "GET_CAMPAIGN_SELECT_VALUE":
            return {
                ...state,
                selectedCampaignValue: action.payload,
            };
    }
};

export default leadReducer;
