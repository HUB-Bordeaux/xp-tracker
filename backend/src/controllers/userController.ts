import type { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
    res.status(200).json({ message: "List of users" });
};

export const createUser = (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({error: "Name and email are required" });
    }
    res.status(201).json({message: `User ${name} created successfully` });
};