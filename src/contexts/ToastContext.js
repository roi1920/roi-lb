import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function useToastContext() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    return (
        <ToastContext.Provider value={{ show, setShow, message, setMessage }}>
            {children}
        </ToastContext.Provider>
    );
}
