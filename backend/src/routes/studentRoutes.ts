import { Router } from "express";
import { createStudent, getStudentById, getStudents } from '../controllers/studentController';

const studentRoutes = Router();

studentRoutes.get("/students", getStudents);
studentRoutes.get("/students/:id", getStudentById);
studentRoutes.post("/students", createStudent);

export default studentRoutes;