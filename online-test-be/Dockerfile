FROM node:lts
WORKDIR /usr/src/server
COPY package.json ./
COPY . .
RUN npm ci
RUN npm install -g express
EXPOSE 9000
CMD ["node","index.js"]