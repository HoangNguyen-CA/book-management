import axios from "axios";
import AuthorInfo from '../models/authorInfo';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/authors',
})

const getAuthors = async () =>{
    const res =  await instance.get<AuthorInfo[]>('/');
    return res.data;
}

const postAuthor = async (name: string) => {
    const res = await instance.post('/',{authorName: name});
    return res.data;
}

const delAuthor = async (id: string) => {
    await instance.delete<AuthorInfo>(`/${id}`)
}

export {getAuthors, postAuthor, delAuthor};
    
