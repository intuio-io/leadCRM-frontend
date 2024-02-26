export const initialFilterState = {
    loading: false,
    filters: [],

    // form
    filter: {
        id: "",
        campaign_id: "",
        filter_type: "",
        filter_value: "",
        filter_condition: "matches exactly",
    },

    selectedValue: null,

    edit: false,
    showFilterForm: false,
    errors: null,
};
