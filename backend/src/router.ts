import { Router } from "express";
import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/studentRoutes";

const apiRoutes = Router();

apiRoutes.use("/", userRoutes);
apiRoutes.use("/", studentRoutes);

export { apiRoutes };