import { Router } from "express";
import { createStudent, getStudentById, getStudents, updateStudent, deleteStudent } from '../controllers/studentController';

const studentRoutes = Router();

studentRoutes.get("/students", getStudents);
studentRoutes.get("/students/:id", getStudentById);
studentRoutes.post("/students", createStudent);
studentRoutes.put("/students/:id", updateStudent);
studentRoutes.delete("/students/:id", deleteStudent);

export default studentRoutes;