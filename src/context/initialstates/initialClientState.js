export const initialClientState = {
    loading: false,
    clients: [],
    records: [],

    // form
    client: {
        id: "",
        company_name: "",
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
    },
    edit: false,
    show: false,
    errors: null,
};
