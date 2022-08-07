# Book Management App

I built this project mainly to understand more about relational databases and containerization.

## App description

users can perform CRUD operations on users and authors. The frontend is built using React and the backend is a simple REST API created with express. authors and books form a many to many relationship and always hold a valid state due to ACID database transactions.

## New technologies

- Material UI
- Docker
- SQL + Postgres

## Lessons learned

### Working with Postgres

Postgres is the first relational database that I worked with. The structure for data is a lot more rigid than with NOSQL, making it perfect for this app. Relationships between entities are clearly modelled and constraints allow for deletions/updates to propagate between multiple tables.

For example, since I added a constraint on

### Working with Docker

When I first tried to deploy my app using docker, I served the static frontend files through the backend API. Even though I used multi-stage builds to reduce the size of the docker image, the resulting image was still a lot bigger than I wanted (>1GB). I thought about it and decided to serve the frontend through a static site host (like netlify), and deploy the backend and database separately. This resulted in the backend production image being only ~120MB.

Separating the frontend and backend drastically reduced the build times and upload/download times. The static frontend files could also be served from a CDN, decreasing response times.
