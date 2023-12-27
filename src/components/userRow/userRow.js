import React from "react";
import { Trash } from "react-bootstrap-icons";
export default function UserRow({ user, setOpen, setUserToDelete }) {
    return (
        <tr key={user.id} style={{ height: "80px" }}>
            <td width={"8%"}>
                {user.id !== Number(localStorage.getItem("id")) && (
                    <button
                        style={{
                            backgroundColor: "red",
                            borderRadius: "100px",
                            color: "white",
                            height: 48,
                            width: 48,
                            borderColor: "transparent",
                        }}
                        onClick={() => {
                            setOpen(true);
                            setUserToDelete(user);
                        }}
                    >
                        <Trash size={24} />
                    </button>
                )}
            </td>
            <td width={"8%"}>{user.id}</td>
            <td width={"20%"}>{user.username}</td>
            <td width={"20%"}>{user.first_name}</td>
            <td width={"20%"}>{user.last_name}</td>
            <td width={"20%"}>{user.email}</td>
            <td width={"20%"}>{user.is_admin.toString()}</td>
        </tr>
    );
}
