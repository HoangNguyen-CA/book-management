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