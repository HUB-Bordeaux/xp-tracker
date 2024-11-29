FROM node:20.12

COPY . .

RUN npm install

CMD [ "sh", "-c", "npx prisma migrate dev --name init && npm run start" ]

EXPOSE 4000
