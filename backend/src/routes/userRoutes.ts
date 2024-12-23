import { Router } from 'express';
import { getUsers, loginUser, registerUser, updateUser, deleteUser } from '../controllers/userController';

const userRoutes = Router();

userRoutes.get("/users", getUsers);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

export default userRoutes;