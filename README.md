# Book Management App

I built this project mainly to understand more about relational databases and containerization with docker.

## App description

users can perform CRUD operations on books and authors. The frontend is built using React; the backend is a simple REST API built using express. Authors and books, stored in a Postgres database, form a many-to-many relationship. The relationship is always valid due to database constraints and ACID database transactions.

## New technologies

- Material UI
- Docker
- SQL + Postgres

## Lessons learned

### Working with Postgres and SQL

Postgres is the first relational database that I worked with. The structure for data is more rigid than with NoSQL, making it perfect for this app. Relationships between entities are modelled using foreign keys and constraints can be used to reinforce rules. My app uses constraints to prevent duplicates and allow for deletions/updates to propagate between multiple tables.

The way I modelled a many-to-many relationship (between authors and books) was to create an intermediary table to hold the relationships. This table holds entries containing a `book_id` and an `author_id`. By doing so, it allows for multiple authors and books to be in different entries. A constraint was put so that no relationship can be duplicated.

```js
ALTER TABLE authors_books
ADD CONSTRAINT uniq UNIQUE (author_id, book_id);
```

Entries inside of this intermediary table will become stale when their corresponding references are deleted. To overcome this, I added constraints that will automatically delete the entries referencing deleted authors or books.

```js
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
```

### Working with Docker

When I first tried to deploy my app using docker, I served the static frontend files through the backend API. Even though I used multi-stage builds to reduce the size of the docker image, the resulting image was still a lot bigger than I wanted (>1GB). I thought about it and decided it would be better to serve the frontend through a static site host (Netlify), and deploy the backend and database separately. This resulted in the production image being only ~120MB.

Separating the frontend and backend drastically reduced the build times and upload/download times for the docker image. The static frontend files could also be served from a CDN, decreasing response times. This comes with a disadvantage of slightly increased latency since requests will have to be made to both the static host and the backend API.
