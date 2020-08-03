FROM node:lts
WORKDIR /usr/src/app
COPY package.json ./
COPY server.js ./
COPY . .
RUN npm ci
EXPOSE 4000
CMD npm start