import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, home, register } from "../../components/utils/constants";
import { useUserContext } from "../../contexts/UserContext";
import axios from "axios";
import { SERVER_URL } from "../../components/utils/constants";
import { useToastContext } from "../../contexts/ToastContext";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const { setUser } = useUserContext();
    const { setMessage, setShow } = useToastContext();
    const navigate = useNavigate();
    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        try {
            const auth = await axios.post(`${SERVER_URL}/auth/login/`, data);
            localStorage.setItem("token", `Token ${auth.data.token}`);
            localStorage.setItem("id", auth.data.id);
            const user = await getUser();
            setUser(user);
            navigate(home);
        } catch (error) {
            setMessage(error.message);
            setShow(true);
            console.error(error);
        }
        setLoading(false);
    };
    return (
        <div className="page-layout center">
            <h1>Please login to use the library.</h1>
            <form id="form" className="contactForm" onSubmit={registerUser}>
                <label>Username: </label>
                <input name="username" type="text" required />
                <label>Password: </label>
                <input name="password" type="password" required />

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <button type="submit">submit</button>
                )}
            </form>

            <p>
                Not registered?{" "}
                <Link style={{ color: "blue" }} to={register}>
                    click to register
                </Link>
            </p>
        </div>
    );
}
