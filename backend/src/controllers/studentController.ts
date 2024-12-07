import type { studentInfo } from "../interfaces/studentInterface";
import { StudentService } from "../services/studentServices";
import type { Request, Response } from "express";

const studentService = new StudentService();

export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await studentService.findAllStudent();
        res.status(200).json({message: students});
    } catch (error) {
        console.error("Error querying the database on getAllStudents route: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getStudentById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (id == undefined) {
        res.status(400).json({message: "Id not given"});
        return
    }
    try {
        const student = await studentService.findStudentById(+id);
        if (student) {
            res.status(200).json({student: student});
        } else {
            res.status(400).json({message: `Student with id ${id} does not exist`});
        }
    } catch(error) {
        console.error("Error querying the database on getStudentById route: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const createStudent = async (req: Request, res: Response) => {
    const newStudent : studentInfo = req.body;

    try {
        const createdStudent = await studentService.createStudent(newStudent.firstName, newStudent.lastName, newStudent.email, newStudent.promo);
        res.status(200).json({
            student: {
                id: createdStudent.id,
                firstname: createdStudent.firstname,
                lastname: createdStudent.lastname,
                promotion: createdStudent.promotion,
                email: createdStudent.email,
            }
        });
    } catch (error: any) {
        res.status(400).json({message: error});
    }
}