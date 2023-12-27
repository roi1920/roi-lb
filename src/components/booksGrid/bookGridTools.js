import React from "react";
import "./booksGrid.css";
import { useBookContext } from "../../contexts/BookContext";
import { sortByABC } from "../utils/constants";
export default function BookGridTools({ search, setSearch }) {
    const { setBooks } = useBookContext();

    function sortBy(value) {
        if (value == 0) return;
        setBooks((prev) => [
            ...prev.sort((a, b) => {
                if (value == 1) {
                    return sortByABC(a, b);
                } else {
                    return new Date(b.date_added) - new Date(a.date_added);
                }
            }),
        ]);
    }

    return (
        <div className="tools-container">
            <div>
                <label>Search: </label>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <select defaultValue={0} onChange={(e) => sortBy(e.target.value)}>
                <option value={0}>choose how to order</option>
                <option value={1}>order by abc</option>
                <option value={2}>order by date</option>
            </select>
        </div>
    );
}
