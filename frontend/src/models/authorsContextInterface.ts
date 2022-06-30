import authorInfo from './authorInfo';
export default interface AuthorsContextInterface {
  authors: authorInfo[];
  loadAuthors: () => void;
  createAuthor: (name: string) => void;
  deleteAuthor: (id: string) => void;
}
