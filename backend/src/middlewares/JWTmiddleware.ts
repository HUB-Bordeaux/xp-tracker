import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({message: "Access denied: No token provided"});
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({message: "Invalid or expired token"});
        return
    }
}