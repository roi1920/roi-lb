import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { BookProvider } from "./contexts/BookContext";
import { ToastProvider } from "./contexts/ToastContext";
import "./reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastProvider>
                <UserProvider>
                    <BookProvider>
                        <App />
                    </BookProvider>
                </UserProvider>
            </ToastProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
