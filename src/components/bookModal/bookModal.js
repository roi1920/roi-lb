import React, { useState } from "react";
import ReactModal from "react-modal";
import { borrowBookById } from "../utils/constants";
import { useToastContext } from "../../contexts/ToastContext";
import { useBookContext } from "../../contexts/BookContext";

export default function BookModal({ open, setOpen, bookToAdd }) {
    const [loading, setLoading] = useState(false);
    const { setShow, setMessage } = useToastContext();
    const { setBooks } = useBookContext();
    const borrowBook = async () => {
        try {
            setLoading(true);
            const res = await borrowBookById(bookToAdd.id);
            if (res === undefined)
                throw new Error("could not borrow the book.");
            setBooks((prev) =>
                prev.map((b) => {
                    if (b.id !== bookToAdd.id) {
                        return b;
                    }
                    b.available_copies--;
                    return b;
                })
            );
            setMessage("Book borrowed.");
            setOpen(false);
        } catch (error) {
            setMessage(error.message);
            console.error(error);
        } finally {
            setShow(true);
        }
        setLoading(false);
    };

    return (
        <ReactModal
            isOpen={open}
            ariaHideApp={false}
            onRequestClose={() => setOpen(false)}
            style={{
                content: {
                    height: "450px",
                    width: "300px",
                    margin: "auto",
                },
            }}
        >
            <div className="book-modal-container">
                <h1>{bookToAdd?.title ?? ""}</h1>
                <img
                    width={"50%"}
                    src={bookToAdd?.img_url ?? ""}
                    alt="book-cover"
                />
                <p>Do you want to borrow this book?</p>
                <button
                    className="book-modal-container-btn"
                    onClick={borrowBook}
                >
                    {loading ? "Loading..." : "Borrow"}
                </button>
            </div>
        </ReactModal>
    );
}
