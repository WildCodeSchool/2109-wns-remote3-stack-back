FROM node:lts
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 8080
CMD ["yarn", "start:dev"]