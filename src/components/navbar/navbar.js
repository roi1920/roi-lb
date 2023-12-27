import React from "react";
import { HouseDoor, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { about, contact, home, user } from "../utils/constants";
import "./navbar.css";
export default function Navbar() {
    return (
        <div className="container">
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <Link to={home} className="left-group">
                    <HouseDoor size={36} />
                    <h1>Roy's Library</h1>
                </Link>
                <Link to={about}>
                    <h2>about</h2>
                </Link>
                <Link to={contact}>
                    <h2>contact</h2>
                </Link>
            </div>
            <Link to={user}>
                <PersonCircle size={36} />
            </Link>
        </div>
    );
}
