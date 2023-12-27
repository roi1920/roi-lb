import axios from "axios";
import AWS from "aws-sdk";
const S3_BUCKET = "roylibrarybucket";
const REGION = "eu-north-1";

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: REGION,
});

const s3 = new AWS.S3();

export const home = "/";
export const user = "/user";
export const register = "/register";
export const login = "/login";
export const about = "/about";
export const contact = "/contact";

export const SERVER_URL = "http://51.20.119.5/api";

export const getUser = async () => {
    try {
        const data = await axios.get(
            `${SERVER_URL}/users/${localStorage.getItem("id")}`,
            {
                headers: { Authorization: localStorage.getItem("token") },
            }
        );
        return data.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllUsers = async () => {
    try {
        const data = await axios.get(`${SERVER_URL}/users/`, {
            headers: { Authorization: localStorage.getItem("token") },
        });
        return data.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUserById = async (data) => {
    try {
        const res = await axios.patch(
            `${SERVER_URL}/users/${localStorage.getItem("id")}`,
            data,
            {
                headers: { Authorization: localStorage.getItem("token") },
            }
        );
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const deleteUserById = async (user_id) => {
    try {
        const res = await axios.delete(`${SERVER_URL}/users/${user_id}`, {
            headers: { Authorization: localStorage.getItem("token") },
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const getBorrowedBooksById = async () => {
    try {
        const data = await axios.get(
            `${SERVER_URL}/books/borrow/${localStorage.getItem("id")}`,
            {
                headers: { Authorization: localStorage.getItem("token") },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const borrowBookById = async (book_id) => {
    try {
        const data = await axios.post(
            `${SERVER_URL}/books/borrow/`,
            { user: localStorage.getItem("id"), book: book_id },
            {
                headers: { Authorization: localStorage.getItem("token") },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const returnBookById = async (book_id) => {
    try {
        const data = await axios.delete(
            `${SERVER_URL}/books/borrow/`,

            {
                params: { user: localStorage.getItem("id"), book: book_id },
                headers: { Authorization: localStorage.getItem("token") },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const createBook = async (data) => {
    try {
        const book = await axios.post(`${SERVER_URL}/books/`, data, {
            headers: { Authorization: localStorage.getItem("token") },
        });
        return book;
    } catch (error) {
        console.error(error);
    }
};
export const editBook = async (book_id, data) => {
    try {
        const book = await axios.patch(`${SERVER_URL}/books/${book_id}`, data, {
            headers: { Authorization: localStorage.getItem("token") },
        });
        return book;
    } catch (error) {
        console.error(error);
    }
};

export const deleteBook = async (book_id) => {
    try {
        const res = await axios.delete(`${SERVER_URL}/books/${book_id}`, {
            headers: { Authorization: localStorage.getItem("token") },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const uploadImage = async (file) => {
    const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
        ContentType: file.type,
    };
    return s3.upload(params).promise();
};

export const capitalLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sortByABC = (a, b) => {
    if (
        capitalLetter(a.title.toLowerCase()) <
        capitalLetter(b.title.toLowerCase())
    )
        return -1;
    if (
        capitalLetter(a.title.toLowerCase()) >
        capitalLetter(b.title.toLowerCase())
    )
        return 1;
    return 0;
};
