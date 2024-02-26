import { createContext, useReducer } from "react";
import authReducer from "./reducers/authReducer";
import { initialAuthState } from "./initialstates/initialAuthState";

import clientReducer from "./reducers/clientReducer";
import { initialClientState } from "./initialstates/initialClientState";

import campaignReducer from "./reducers/campaignReducer";
import { initialCampaignState } from "./initialstates/initialCampaignState";

import campaignClientReducer from "./reducers/campaignClientReducer";
import { initialCampaignClientState } from "./initialstates/initialCampaignClientState";

import fieldReducer from "./reducers/fieldReducer";
import { initialFieldState } from "./initialstates/initialFieldState";

import filterReducer from "./reducers/filterReducer";
import { initialFilterState } from "./initialstates/initialFilterState";

import leadReducer from "./reducers/leadReducer";
import { initialLeadState } from "./initialstates/initialLeadState";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

    const [clientState, clientDispatch] = useReducer(
        clientReducer,
        initialClientState
    );

    const [campaignState, campaignDispatch] = useReducer(
        campaignReducer,
        initialCampaignState
    );

    const [campaignClientState, campaignClientDispatch] = useReducer(
        campaignClientReducer,
        initialCampaignClientState
    );

    const [fieldState, fieldDispatch] = useReducer(
        fieldReducer,
        initialFieldState
    );

    const [filterState, filterDispatch] = useReducer(
        filterReducer,
        initialFilterState
    );

    const [leadState, leadDispatch] = useReducer(leadReducer, initialLeadState);

    return (
        <GlobalContext.Provider
            value={{
                authState,
                authDispatch,
                clientState,
                clientDispatch,
                campaignState,
                campaignDispatch,
                campaignClientState,
                campaignClientDispatch,
                fieldState,
                fieldDispatch,
                filterState,
                filterDispatch,
                leadState,
                leadDispatch,
            }}
        >
            {children}
            <ToastContainer position="top-center" />
        </GlobalContext.Provider>
    );
};
