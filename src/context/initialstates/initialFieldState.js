export const initialFieldState = {
    loading: false,
    fields: [],

    // form
    field: {
        id: "",
        campaign_id: "",
        field_name: "",
        field_type: "",
        field_description: "",
    },

    selectedValue: null,

    edit: false,
    showFieldForm: false,
    showResetModal: false,
    errors: null,
};
