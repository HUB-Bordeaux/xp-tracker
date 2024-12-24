import type { Request, Response } from "express";
import type { userCredentials } from "../interfaces/userInterfaces";
import { UserService } from "../services/userServices";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ message: users});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const registerUser = async (req: Request, res: Response) => {
    const {username, password } : userCredentials = req.body;

    if (!username || !password) {
        res.status(400).json({error: "Name and email are required" });
        return
    }
    try {
        const newUser = await userService.registerUser(username, password);
        const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
        res.status(200).json({
            token: token,
            user: {
                id: newUser.id,
                username: newUser.username,
            },
        });
    } catch (error: any) {
        if (error.message === "Username already exists") {
            res.status(409).json({message: "Username already exists"});
        } else {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } : userCredentials = req.body;

    if (!username || !password) {
        res.status(400).json({error: "Username and password are required"});
        return
    }
    try {
        const user = await userService.findUserByUsername(username);
        if (user && user.username === username) {
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION
            });
            if (isPasswordMatching)
                res.status(200).json({token: token});
            else
                res.status(401).json({message: "Invalid username or password"});
        } else {
            res.status(401).json({message: "Invalid username or password"});
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { username, password }: userCredentials = req.body;

    if (id === undefined) {
        res.status(400).json({error: "User ID not given"});
        return
    }
    if (!username || !password) {
        res.status(400).json({error: "Username or password is required"});
        return
    }
    try {
        await userService.deleteUser(+id);
        res.status(200).json({message: "User updated succesfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    
    if (id === undefined) {
        res.status(400).json({error: "User ID not given"});
        return
    }
    try {
        await userService.deleteUser(+id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}