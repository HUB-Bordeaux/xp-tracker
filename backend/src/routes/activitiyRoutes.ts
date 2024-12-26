import { Router } from "express";
import { getAllActivities, getAllHackathons, getAllTalks, getAllUserGroups, getAllFreeProjects, getOneActivity, updateActivity, deleteActivity, createActivity } from "../controllers/activityController";
import { verifyToken } from "../middlewares/JWTmiddleware";

const activityRoutes = Router();

activityRoutes.use(verifyToken);

activityRoutes.get("/activities", getAllActivities);

activityRoutes.get("/activities/hackathons", getAllHackathons);
activityRoutes.post("/activities/", createActivity);
activityRoutes.get("/activities/hackathons", getAllHackathons);
activityRoutes.get("/activities/talks", getAllTalks);
activityRoutes.get("/activities/usergroups", getAllUserGroups);
activityRoutes.get("/activities/freeprojects", getAllFreeProjects);
activityRoutes.get("/activities/:id", getOneActivity);
activityRoutes.put("/activities/:id", updateActivity);
activityRoutes.delete("/activities/:id", deleteActivity);

export default activityRoutes;