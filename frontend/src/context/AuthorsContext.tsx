import React, { createContext } from 'react';
import AuthorsContextInterface from '../models/authorsContextInterface';

export const AuthorsContext = createContext<AuthorsContextInterface | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export const AuthorsProvider = ({ children }: Props) => {
  return (
    <AuthorsContext.Provider value={{ authors: [] }}>
      {children}
    </AuthorsContext.Provider>
  );
};
