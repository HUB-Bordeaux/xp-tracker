import express from "express";
import cors from 'cors';
import { apiRoutes } from "./router";
import { fillDB } from "./populate";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from "./swaggerConfig";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

const specs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', apiRoutes);

await fillDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
