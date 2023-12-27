import React from "react";
import { Toast } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { useToastContext } from "../../contexts/ToastContext";

export default function CustomToast() {
    const { show, setShow, message } = useToastContext();
    return (
        <Toast
            style={{
                height: 50,
                width: "fit-content",
                border: "1px solid black",
                backgroundColor: "orange",
                padding: 20,
                position: "fixed",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                margin: "auto",
                zIndex: 9999,
            }}
            show={show}
            onClose={() => setShow(false)}
            autohide
            delay={1500}
        >
            <Toast.Header closeButton={false}></Toast.Header>
            <Toast.Body style={{ display: "flex", alignItems: "center" }}>
                <X size={48} onClick={() => setShow(false)} />
                {message}
            </Toast.Body>
        </Toast>
    );
}
