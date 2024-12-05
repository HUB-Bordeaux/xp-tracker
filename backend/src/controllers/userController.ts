import type { Request, Response } from "express";
import type { userCredentials } from "../interfaces/userInterfaces";
import { UserService } from "../services/userServices";
import bcrypt from 'bcrypt';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ message: users});
    } catch(error) {
        console.error("Error querying the database on getAllUsers route: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const registerUser = async (req: Request, res: Response) => {
    const {username, password } : userCredentials = req.body;

    if (!username || !password)
        res.status(400).json({error: "Name and email are required" });
    try {
        const newUser = await userService.registerUser(username, password);
        res.status(200).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                username: newUser.username,
            },
        });
    } catch (error: any) {
        if (error.message === "Username already exists") {
            res.status(409).json({message: "Username already exists"});
        } else {
            console.error("Error during registration: ", error);
            res.status(500).json({message: "Internal server error"});
        }
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } : userCredentials = req.body;

    if (!username || !password)
        res.status(400).json({error: "Username and password are required"});
    try {
        const user = await userService.findUserByUsername(username);
        if (user && user.username === username) {
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            if (isPasswordMatching)
                res.status(200).json({token: "Token"});
            else
                res.status(401).json({message: "Invalid username or password"});
        } else {
            res.status(401).json({message: "Invalid username or password"});
        }
    } catch(error) {
        console.error("Error querying the database on login route: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};
