import { Router } from 'express';
import { getUsers, loginUser, registerUser, updateUser, deleteUser } from '../controllers/userController';
import { verifyToken } from "../middlewares/JWTmiddleware";

const userRoutes = Router();

userRoutes.get("/users", verifyToken, getUsers);
userRoutes.put("/users/:id", verifyToken, updateUser);
userRoutes.delete("/users/:id", verifyToken, deleteUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

export default userRoutes;