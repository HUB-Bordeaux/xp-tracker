import type { studentInfo } from "../interfaces/studentInterface";
import { ActivityService } from "../services/activityServices";
import { StudentActivityService } from "../services/studentActivityServices";
import { StudentService } from "../services/studentServices";
import type { Request, Response } from "express";

const studentService = new StudentService();
const activityService = new ActivityService();
const studentActivityService = new StudentActivityService();

export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await studentService.findAllStudent();
        const formatedStudents: any[] = []

        for (const student of students) {
            const studentActivities = await studentActivityService.getActivitiesByStudentId(student.id);
            const activities: any[] = [];
            for (const studentActivity of studentActivities) {
                const activity = await activityService.findActivityById(studentActivity.studentId);
                activities.push({
                    id: activity?.id,
                    name: activity?.name,
                    xpOrganisation: activity?.xpOrganisation,
                    xpParticipation: activity?.xpParticipation,
                    category: activity?.category,
                    role: studentActivity.role,
                    present: studentActivity.present
                });
            }
            formatedStudents.push({
                id: student.id,
                image: student.image ? student.image.toString('base64') : null,
                imageType: student.imageType ? student.imageType : "",
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                promotion: student.promotion,
                activities: activities
            })
        }
        res.status(200).json(formatedStudents);
    } catch (error) {
        console.error(error);
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
        if (student === null) {
            res.status(400).json({message: `Student not found with id: ${id}`});
            return
        }
        const studentActivities = await studentActivityService.getActivitiesByStudentId(student.id);
        const activities: any[] = [];
        for (const studentActivity of studentActivities) {
            const activity = await activityService.findActivityById(studentActivity.studentId);
            activities.push({
                name: activity?.name,
                xpOrganisation: activity?.xpOrganisation,
                xpParticipation: activity?.xpParticipation,
                category: activity?.category,
                role: studentActivity.role,
                present: studentActivity.present
            });
        }
        const formatedStudent = {
            id: student.id,
            image: student.image ? student.image.toString('base64') : null,
            imageType: student.imageType ? student.imageType : "",
            firstname: student.firstname,
            lastname: student.lastname,
            email: student.email,
            promotion: student.promotion,
            activities: activities
        }
        res.status(200).json(formatedStudent);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const createStudent = async (req: Request, res: Response) => {
    const { firstName, lastName, email, promo } = req.body;
    const image = req.file?.buffer;
    const imageType = req.file?.mimetype;

    try {
        const createdStudent = await studentService.createStudent(firstName, lastName, email, +promo, image, imageType);
        res.status(200).json({createdStudent});
    } catch (error: any) {
        console.error(error);
        res.status(400).json({message: error});
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    const { firstName, lastName, email, promo } = req.body;
    const image = req.file?.buffer;
    const imageType = req.file?.mimetype;
    const id = req.params.id;

    try {
        if (id === undefined) {
            res.status(400).json({message: "Student ID not provided"});
        } else if (!image || !imageType) {
            res.status(400).json({message: "Student image is not provided"});
        } else {
            const student = await studentService.updateStudent(+id, firstName, lastName, email, +promo, image, imageType);
            if (!student)
                res.status(404).json({message: "Student not found"});
            else
                res.status(200).json({message: "Student updated successfully"});
        }
    } catch (error: any) {
        console.error(error);
        res.status(400).json({message: error});
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        if (id === undefined) {
            res.status(400).json({message: "Student ID not provided"});
        } else {
            const student = await studentService.deleteStudent(+id);
            if (!student) {
                res.status(404).json({message: "Student not found"});
                return;
            }
            await studentActivityService.deleteStudentActivityByStudentId(+id);
            res.status(200).json({message: "Student deleted successfully"});
        }
    } catch (error: any) {
        console.error(error);
        res.status(400).json({message: error});
    }
}