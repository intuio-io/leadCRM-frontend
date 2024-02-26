export const initialCampaignClientState = {
    supplierLoading: false,
    buyerLoading: false,
    suppliers: [],
    buyers: [],
    type: null,
    value: null,
    campaignClientInfo: {},
    nickName: {}, // this will take the entire object of the campaignClientInfo and will be used to compare the changes for the update

    // form
    show: false,
    errors: null,
};
