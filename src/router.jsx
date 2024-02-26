import { Navigate, createBrowserRouter } from "react-router-dom";
import {
    Login,
    Signup,
    Dashboard,
    NotFound,
    Clients,
    Campaigns,
    EditCampaign,
    EditCampaignClient,
    Leads,
} from "./views";
import { DefaultLayout, GuestLayout } from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/clients",
                element: <Clients />,
            },
            {
                path: "/campaigns",
                element: <Campaigns />,
            },
            {
                path: "/campaigns/:id/edit",
                element: <EditCampaign />,
            },
            {
                path: "/campaigns/:campaignId/:type/:typeId",
                element: <EditCampaignClient />,
            },
            {
                path: "/leads",
                element: <Leads />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
