import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { GlobalProvider } from "./context/Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GlobalProvider>
            <RouterProvider router={router} />
        </GlobalProvider>
    </React.StrictMode>
);
