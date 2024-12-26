import { Router } from "express";
import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/studentRoutes";
import activityRoutes from "./routes/activitiyRoutes";

const apiRoutes = Router();

apiRoutes.use("/", userRoutes);
apiRoutes.use("/", studentRoutes);
apiRoutes.use("/", activityRoutes);

export { apiRoutes };