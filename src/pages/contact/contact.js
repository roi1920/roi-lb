import React from "react";
import Navbar from "../../components/navbar/navbar";
import { useToastContext } from "../../contexts/ToastContext";

export default function Contact() {
    const { setMessage, setShow } = useToastContext();

    const sendForm = (e) => {
        e.preventDefault();
        setMessage("form submitted.");
        setShow(true);
    };

    return (
        <div>
            <Navbar />
            <div className="page-layout">
                <h1>Contact us</h1>
                <div>
                    <h2>contactus@gmail.com</h2>
                    <h2>0544455445</h2>
                </div>
                <form className="contactForm" onSubmit={sendForm}>
                    <input placeholder="name" />
                    <input placeholder="phone" />
                    <input placeholder="email" />
                    <textarea rows={10} cols={50} placeholder="message..." />
                    <button type="submit">Submit form</button>
                </form>
            </div>
        </div>
    );
}
