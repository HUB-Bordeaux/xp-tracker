import { Router } from "express";
import userRoutes from "./routes/userRoutes";

const apiRoutes = Router();

apiRoutes.use("/", userRoutes);

export { apiRoutes };