import React, { createContext, useEffect, useState } from 'react';
import AuthorsContextInterface from '../models/authorsContextInterface';
import AuthorInfo from '../models/authorInfo';
import { useFetch } from 'use-http';

export const AuthorsContext = createContext<AuthorsContextInterface | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export const AuthorsProvider = ({ children }: Props) => {
  const { get, post, del, loading, error } = useFetch<AuthorInfo[]>(`${process.env.REACT_APP_API_URL}/api`);

  const [authors, setAuthors] = useState<AuthorInfo[]>([]);

  const loadAuthors = async () => {
    try {
      const res = await get('/authors');
      setAuthors(res);
    } catch (e) {
      console.log('Error in loadAuthors: ', e);
    }
  };

  const createAuthor = async (name: string) => {
    try {
      const res = await post('/authors', {
        authorName: name,
      });

      setAuthors([...authors, res[0]]);
    } catch (e) {
      console.log('Error in createAuthor:', e);
    }
  };

  const deleteAuthor = async (id: string) => {
    try {
      const res = await del(`/authors/${id}`);
      console.log(res);
      setAuthors(authors.filter((a) => a.author_id !== id));
    } catch (e) {
      console.log('Error in deleteAuthor:', e);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  return (
    <AuthorsContext.Provider
      value={{
        authors,
        loading,
        error,
        createAuthor,
        loadAuthors,
        deleteAuthor,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};
