import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
// add bootstrap stying
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
// add router
import { BrowserRouter as Router } from "react-router-dom";
// add redux store and storage
import { Provider } from "react-redux";
import { initStore, presister } from "./store/index";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={initStore}>
            <PersistGate loading={null} persistor={presister}>
                <Router>
                    <App />
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
