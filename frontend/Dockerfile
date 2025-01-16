FROM node:20.12

COPY . .

RUN npm install

RUN npm i -g serve

RUN npm run build

EXPOSE 8080

CMD [ "serve", "-s", "build" ]
