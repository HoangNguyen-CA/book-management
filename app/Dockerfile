FROM node:16.15.1-alpine3.16 as client
WORKDIR /client
COPY ["frontend/package.json", "frontend/package-lock.json*", "./"]
RUN npm install --production
COPY frontend ./
RUN npm run build

FROM node:16.15.1-alpine3.16
WORKDIR /app
COPY ["backend/package.json", "backend/package-lock.json*", "./"]
RUN npm install --production
COPY ./backend .
COPY --from=client /client/build ./build
CMD [ "node", "server.js" ]