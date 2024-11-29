import { Router } from 'express';
import { getUsers, loginUser, registerUser } from '../controllers/userController';

const userRoutes = Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

export default userRoutes;