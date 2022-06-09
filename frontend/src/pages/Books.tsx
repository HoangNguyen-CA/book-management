import { useFetch } from 'use-http';
import Book from '../models/book';
const Books = () => {
  const { loading, error, data } = useFetch<Book[]>('/books', {}, []);

  let element: React.ReactNode = <></>;
  if (loading) {
    element = <>Loading...</>;
  } else if (error) {
    element = <>error</>;
  } else if (data) {
    element = data.map((b) => (
      <>
        {b.book_id} {b.book_name}
      </>
    ));
  }

  return <div>{element}</div>;
};

export default Books;
