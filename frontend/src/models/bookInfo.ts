import AuthorsInfo from './authorInfo';
export default interface BookInfo {
  book_id: string;
  book_name: string;
  authors: AuthorsInfo[];
}
