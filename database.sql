CREATE DATABASE booksapp;

CREATE TABLE authors(
    author_id SERIAL PRIMARY KEY,
    author_name TEXT
);

CREATE TABLE books(
    book_id SERIAL PRIMARY KEY,
    book_name TEXT
);

CREATE TABLE authors_books(
    author_id INT,
    book_id INT,

    FOREIGN KEY(author_id)
        REFERENCES authors(author_id),
    FOREIGN KEY (book_id)
        REFERENCES books(book_id)
);


/* Update Foreign Key Constraint */

ALTER TABLE authors_books
DROP CONSTRAINT "authors_books_author_id_fkey";

ALTER TABLE authors_books
DROP CONSTRAINT "authors_books_book_id_fkey";

ALTER TABLE authors_books
ADD CONSTRAINT books_id_fk
FOREIGN KEY (book_id)
REFERENCES books(book_id)
ON DELETE CASCADE;


ALTER TABLE authors_books
ADD CONSTRAINT authors_id_fk
FOREIGN KEY (author_id)
REFERENCES authors(author_id)
ON DELETE CASCADE;

/* Multiple join */
SELECT books.book_id, book_name, authors.author_id, author_name FROM books LEFT JOIN authors_books ON books.book_id = authors_books.book_id LEFT JOIN authors ON authors_books.author_id = authors.author_id;

/* Add unique constraint to junction */

ALTER TABLE authors_books
ADD CONSTRAINT uniq UNIQUE (author_id, book_id);