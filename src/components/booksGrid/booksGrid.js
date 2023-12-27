import React, { useEffect, useState } from "react";
import BookGridItem from "../bookGridItem/bookGridItem";
import "./booksGrid.css";
import { useUserContext } from "../../contexts/UserContext";
import { SERVER_URL } from "../utils/constants";
import axios from "axios";
import { useBookContext } from "../../contexts/BookContext";
import BookModal from "../bookModal/bookModal";
import EditBookModal from "../bookModal/editBookModal";
import BookGridTools from "./bookGridTools";
import { Trash } from "react-bootstrap-icons";
import RemoveBookModal from "../bookModal/removeBookModal";
import { useToastContext } from "../../contexts/ToastContext";
export default function BooksGrid() {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [bookToAdd, setBookToAdd] = useState(null);
    const [search, setSearch] = useState("");
    const { books, setBooks } = useBookContext();
    const { user } = useUserContext();
    const { setShow, setMessage } = useToastContext();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await axios.get(`${SERVER_URL}/books`, {
                    headers: { Authorization: localStorage.getItem("token") },
                });
                setBooks(data.data);
            } catch (error) {
                setMessage("error fetching the books.");
                setShow(true);
                console.error(error);
            }
        };
        getBooks();
    }, [setBooks, setMessage, setShow]);

    function bookClickHandler(book, del = false) {
        if (del) setOpenDelete(true);
        else setOpen(true);
        setBookToAdd(book);
    }

    return (
        <div>
            <BookGridTools search={search} setSearch={setSearch} />
            <div className="books-grid">
                {books.filter((b) => b.title.includes(search.trim())).length >
                0 ? (
                    books
                        .filter((b) => b.title.includes(search.trim()))
                        .map((book) => {
                            return (
                                <div
                                    key={book.id}
                                    onClick={() => bookClickHandler(book)}
                                    style={{
                                        display: "flex",
                                        position: "relative",
                                        justifyContent: "center",
                                    }}
                                >
                                {user.is_admin && 
                                    <button
                                    style={{
                                        position: "absolute",
                                        top: -10,
                                        backgroundColor: "red",
                                        borderColor: "transparent",
                                        borderRadius: "100px",
                                        height: 48,
                                        width: 48,
                                    }}
                                    onClick={(e) => {
                                        bookClickHandler(book, true);
                                        e.stopPropagation();
                                    }}
                                    >
                                        <Trash size={24} color="white" />
                                    </button>
                                    }
                                    <BookGridItem book={book} />
                                </div>
                            );
                        })
                ) : (
                    <h1>There are no books in the library</h1>
                )}
                {user && user.is_admin ? (
                    <EditBookModal
                        open={open}
                        setOpen={setOpen}
                        bookToAdd={bookToAdd}
                    />
                ) : (
                    <BookModal
                        open={open}
                        setOpen={setOpen}
                        bookToAdd={bookToAdd}
                    />
                )}
                <RemoveBookModal
                    open={openDelete}
                    setOpen={setOpenDelete}
                    bookToRemove={bookToAdd}
                />
            </div>
        </div>
    );
}
