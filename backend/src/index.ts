import express from "express";
import cors from 'cors';
import { apiRoutes } from "./router";
import { fillDB } from "./populate";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.use('/', apiRoutes);

await fillDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
