import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
// add bootstrap stying
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
// add datepicker package stying
import "react-datepicker/dist/react-datepicker.css";
// add router
import { BrowserRouter as Router } from "react-router-dom";
// add redux store and storage
import { Provider } from "react-redux";
import { initStore } from "./store/index";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={initStore}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);
