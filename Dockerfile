# build stage
FROM node:20-alpine as build

WORKDIR /oc_github_bot

COPY package*.json .

RUN npm install

COPY . . 

EXPOSE 5080

CMD ["npm", "run", "start"]