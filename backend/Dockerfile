FROM node:16.15.1-alpine3.16

WORKDIR /usr/app

ENV NODE_ENV=DEVELOPMENT

COPY package*.json ./

RUN npm install 

COPY . ./

EXPOSE 5000

CMD [ "npm", "run", "dev"]