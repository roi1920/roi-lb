import React, { createContext, useContext, useState } from "react";

const BookContext = createContext();

export function useBookContext() {
    return useContext(BookContext);
}

export function BookProvider({ children }) {
    const [books, setBooks] = useState([]);
    return (
        <BookContext.Provider value={{ books, setBooks }}>
            {children}
        </BookContext.Provider>
    );
}
