import express, { Router } from "express";
import { createStudent, getStudentById, getStudents, updateStudent, deleteStudent } from '../controllers/studentController';
import { verifyToken } from "../middlewares/JWTmiddleware";
import upload from "../middlewares/uploadMiddleware";

const studentRoutes = Router();

studentRoutes.use(verifyToken);

studentRoutes.get("/students", getStudents);
studentRoutes.get("/students/:id", getStudentById);
studentRoutes.post("/students", express.json({limit: '10mb'}), upload, createStudent);
studentRoutes.put("/students/:id", express.json({limit: '10mb'}), upload, updateStudent);
studentRoutes.delete("/students/:id", deleteStudent);

export default studentRoutes;