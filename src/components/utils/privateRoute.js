import React from "react";
import { Navigate } from "react-router-dom";
import { login } from "./constants";

const PrivateRoute = ({ children }) => {
    if (localStorage.getItem("token") === null) return <Navigate to={login} />;
    return children;
};

export default PrivateRoute;
