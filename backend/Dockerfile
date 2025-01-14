FROM node:20.12

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "sh", "-c", "npx prisma migrate deploy && npm run start" ]
