FROM node:20.12

COPY . .

RUN npm install

CMD [ "sh", "-c", "npx prisma migrate deploy && npm start" ]

EXPOSE 4000