const campaignClientReducer = (state, action) => {
    switch (action.type) {
        case "SUPPLIER_FETCH_START":
            return { ...state, supplierLoading: true };

        case "SUPPLIER_FETCH_SUCCESS":
            return {
                ...state,
                supplierLoading: false,
                suppliers: action.payload,
            };

        case "DELETE_SUPPLIER":
            return {
                ...state,
                suppliers: state.suppliers.filter(
                    (supplier) => supplier.id !== action.payload
                ),
            };

        case "GET_SELECT_VALUE":
            return {
                ...state,
                value: action.payload,
            };

        case "ERRORS":
            return {
                ...state,
                supplierLoading: false,
                buyerLoading: false,
                errors: action.payload,
            };

        case "EDIT_CAMPAIGN_CLIENT_FETCH_SUCCESS":
            return {
                ...state,
                supplierLoading: false,
                buyerLoading: false,
                campaignClientInfo: action.payload,
                nickName: action.payload,
            };

        case "UPDATE_NICKNAME":
            return {
                ...state,
                nickName: {
                    ...state.nickName,
                    [action.payload.name]: action.payload.value,
                },
            };

        // Buyer side
        case "BUYER_FETCH_START":
            return { ...state, buyerLoading: true };

        case "BUYER_FETCH_SUCCESS":
            return {
                ...state,
                buyerLoading: false,
                buyers: action.payload,
            };

        case "DELETE_BUYER":
            return {
                ...state,
                buyers: state.buyers.filter(
                    (buyer) => buyer.id !== action.payload
                ),
            };

        // Campaign Client Form

        case "OPEN_MODAL":
            return {
                ...state,
                type: action.payload,
                show: true,
            };

        case "DEFAULT_STATE":
            return {
                ...state,
                type: null,
                show: false,
                value: null,
                errors: null,
            };
    }
};

export default campaignClientReducer;
