import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../components/utils/constants";
import UserRow from "../../components/userRow/userRow";
import DeleteUserModal from "../../components/userModal/deleteUserModal";
import { useToastContext } from "../../contexts/ToastContext";

export default function UsersListTab() {
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const { setMessage, setShow } = useToastContext();
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const users = await getAllUsers();
                setUserList(users);
            } catch (error) {
                setMessage(error.message);
                setShow(true);
                console.error(error);
            }
        };
        fetchAllUsers();
    }, [setMessage, setShow]);
    return (
        <div>
            <table>
                <tr>
                    <th></th>
                    <th style={{ textAlign: "start" }}>Id</th>
                    <th style={{ textAlign: "start" }}>Username</th>
                    <th style={{ textAlign: "start" }}>First name</th>
                    <th style={{ textAlign: "start" }}>Last name</th>
                    <th style={{ textAlign: "start" }}>Email</th>
                    <th style={{ textAlign: "start" }}>Admin</th>
                </tr>
                {userList.length > 0 &&
                    userList.map((user) => {
                        return (
                            <UserRow
                                user={user}
                                setUserToDelete={setUserToDelete}
                                setOpen={setOpen}
                            />
                        );
                    })}
            </table>
            <DeleteUserModal
                open={open}
                setOpen={setOpen}
                userToDelete={userToDelete}
                setUserList={setUserList}
            />
        </div>
    );
}
