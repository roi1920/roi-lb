import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../components/utils/constants";
import axios from "axios";
import { SERVER_URL } from "../../components/utils/constants";
import { useToastContext } from "../../contexts/ToastContext";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const { setMessage, setShow } = useToastContext();
    const navigate = useNavigate();
    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            username: e.target.username.value,
            password: e.target.password.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
        };
        try {
            await axios.post(`${SERVER_URL}/auth/register/`, data);
            navigate(login);
        } catch (error) {
            setMessage(error.message);
            setShow(true);
            console.error(error);
        }
        setLoading(false);
    };
    return (
        <div className="page-layout center">
            <h1>Please register to use the library.</h1>
            <form id="form" className="contactForm" onSubmit={registerUser}>
                <label>Username: </label>
                <input name="username" type="text" required />
                <label>Password: </label>
                <input name="password" type="password" required />
                <label>First name: </label>
                <input name="first_name" type="text" required />
                <label>Last name: </label>
                <input name="last_name" type="text" required />
                <label>Email: </label>
                <input name="email" type="text" required />

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <button type="submit">submit</button>
                )}
            </form>

            <p>
                Already registered?{" "}
                <Link style={{ color: "blue" }} to={login}>
                    click to login
                </Link>
            </p>
        </div>
    );
}
