import axios from "axios";
import BookInfo from '../models/bookInfo';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/books',
})

const getBooks = async () =>{
    const res =  await instance.get<BookInfo[]>('/');
    return res.data;
}

const getBook = async (bookId: string) => {
    const res = await instance.get<BookInfo>(`/${bookId}`);
    return res.data;
}

const postBook = async (bookName: string, authorIds: string[]) => {
    const res = await instance.post<BookInfo[]>('/', {bookName, authorIds});
    return res.data;
}

const deleteBook = async(bookId: string) =>{
    await instance.delete(`/${bookId}`);
}

const postBookAuthor = async(bookId: string, authorIds: string[]) =>{
    await instance.post(`/${bookId}/authors`, {authorIds});
}

const deleteBookAuthor = async(bookId: string, authorIds: string[]) =>{
    await instance.delete(`/${bookId}/authors`, {data: {authorIds}});
}

export {getBooks, postBook, getBook ,deleteBook,postBookAuthor, deleteBookAuthor};
    