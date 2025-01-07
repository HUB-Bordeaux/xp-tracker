cd backend/
npm install
npx prisma generate --schema=./prisma/schema.prisma
docker-compose up --build