import React, { useState } from "react";
import ReactModal from "react-modal";
import { useBookContext } from "../../contexts/BookContext";
import { createBook, uploadImage } from "../utils/constants";
import { useToastContext } from "../../contexts/ToastContext";

export default function AddBookModal({ open, setOpen }) {
    const { setBooks } = useBookContext();
    const [loading, setLoading] = useState(false);
    const { setShow, setMessage } = useToastContext();

    const addBook = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const uploadImageRes = await uploadImage(e.target.img_url.files[0]);
            if (uploadImageRes?.Location === undefined)
                throw new Error("unable to upload image.");
            const data = {
                title: e.target.title.value,
                available_copies: e.target.available_copies.value,
                img_url: uploadImageRes.Location,
            };
            const res = await createBook(data);
            if (res.status === 404)
                throw new Error("unable to create new book.");
            const book = res.data;
            setBooks((prev) => [...prev, book]);
            setMessage("Book created successfully");
            setOpen(false);
        } catch (error) {
            setMessage(error.message);
            console.error(error);
        } finally {
            setLoading(false);
            setShow(true);
        }
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
            <form className="contactForm" onSubmit={addBook}>
                <label>Title: </label>
                <input name="title" type="text" required />
                <label>Available copies: </label>
                <input name="available_copies" type="number" min={0} required />
                <input type="file" name="img_url" required />
                <button type="submit">
                    {loading ? "Loading..." : "Add book"}
                </button>
            </form>
        </ReactModal>
    );
}
