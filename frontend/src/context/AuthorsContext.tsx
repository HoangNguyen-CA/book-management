import React, { createContext, useEffect, useState } from 'react';
import AuthorsContextInterface from '../models/authorsContextInterface';
import AuthorInfo from '../models/authorInfo';
import {getAuthors, postAuthor, delAuthor} from '../services/authorService';

export const AuthorsContext = createContext<AuthorsContextInterface | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export const AuthorsProvider = ({ children }: Props) => {

  const [authors, setAuthors] = useState<AuthorInfo[]>([]);

  const loadAuthors = async () => {
   
    const res = await getAuthors();
    setAuthors(res);
  };

  const createAuthor = async (name: string) => {
      const res = await postAuthor(name);
      setAuthors([...authors, res[0]]);
  };

  const deleteAuthor = async (id: string) => {
      await delAuthor(id);
      setAuthors(authors.filter((a) => a.author_id !== id));
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  return (
    <AuthorsContext.Provider
      value={{
        authors,
        createAuthor,
        loadAuthors,
        deleteAuthor,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};
