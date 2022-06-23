FROM node as client
WORKDIR /client
COPY ["frontend/package.json", "frontend/package-lock.json*", "./"]
RUN npm install --production
COPY frontend ./
RUN npm run build

FROM node
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
COPY --from=client /client/build ./build
CMD [ "node", "server.js" ]