import React from "react";
import ReactModal from "react-modal";
import { deleteUserById } from "../utils/constants";
import { useToastContext } from "../../contexts/ToastContext";

export default function DeleteUserModal({
    open,
    setOpen,
    userToDelete,
    setUserList,
}) {
    const { setShow, setMessage } = useToastContext();

    return (
        <ReactModal
            isOpen={open}
            ariaHideApp={false}
            onRequestClose={() => setOpen(false)}
            style={{
                content: {
                    height: "80px",
                    width: "300px",
                    margin: "auto",
                },
            }}
        >
            <div className="logoutModal">
                <h2>Delete User: {userToDelete?.id}?</h2>
                <div className="logoutModalBtns">
                    <button
                        onClick={async () => {
                            try {
                                const res = await deleteUserById(
                                    userToDelete.id
                                );
                                if (res === undefined)
                                    throw new Error("unable to delete user.");
                                setUserList((prev) => {
                                    const tmp = [...prev];
                                    var index = tmp.indexOf(userToDelete);
                                    tmp.splice(index, 1);
                                    return tmp;
                                });
                                setMessage("user deleted.");
                                setOpen(false);
                            } catch (error) {
                                setMessage(error.message);
                                console.error(error);
                            } finally {
                                setShow(true);
                            }
                        }}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </ReactModal>
    );
}
