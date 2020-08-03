FROM node:lts
WORKDIR /usr/src/app
COPY package.json ./
COPY server.js ./
COPY . .
RUN npm ci
EXPOSE 3000
CMD npm start
