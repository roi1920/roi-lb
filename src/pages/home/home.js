import React, { useEffect, useState } from "react";
import BooksGrid from "../../components/booksGrid/booksGrid";
import Navbar from "../../components/navbar/navbar";
import { useUserContext } from "../../contexts/UserContext";
import AddBookModal from "../../components/bookModal/addBookModal";
import { getUser } from "../../components/utils/constants";
import { useToastContext } from "../../contexts/ToastContext";
export default function Home() {
    const { user, setUser } = useUserContext();
    const [open, setOpen] = useState(false);
    const { setShow, setMessage } = useToastContext();

    useEffect(() => {
        const receiveUser = async () => {
            try {
                const data = await getUser();
                setUser(data);
            } catch (error) {
                setMessage(error.message);
                setShow(true);
                console.error(error);
            }
        };
        !user && receiveUser();
    }, [user, setUser, setShow, setMessage]);
    return (
        <div>
            <Navbar />
            <div className="page-layout">
                <img src="book_shelf_image.jpg" alt="hero_image" />
                {user && user.is_admin && (
                    <button
                        style={{
                            height: "70px",
                            width: "200px",
                            alignSelf: "center",
                        }}
                        onClick={() => setOpen(true)}
                    >
                        add new book +
                    </button>
                )}
                <BooksGrid />
                <AddBookModal open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}
