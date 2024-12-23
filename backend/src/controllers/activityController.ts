import { ActivityService } from "../services/activityServices";
import { StudentActivityService } from "../services/studentActivityServices";
import type { Request, Response } from "express";
import { StudentService } from "../services/studentServices";

const studentService = new StudentService();
const studentActivityService = new StudentActivityService();
const activityService = new ActivityService();

export const getActivities = async (req: Request, res: Response) => {
    try {
        const activities = await activityService.findAllActivities();
        const formatedActivities: any[] = [];

        for (const activity of activities) {
            const studentActivities = await studentActivityService.getStudentsByActivityId(activity.id);
            const students = Promise.all(
                studentActivities.map(async (studentActivity) => {
                    const student = await studentService.findStudentById(studentActivity.studentId);
                    return {
                        id: student?.id,
                        firstname: student?.firstname,
                        lastname: student?.lastname,
                        email: student?.email,
                        promotion: student?.promotion,
                        role: studentActivity.role,
                        present: studentActivity.present
                    };
                })
            );
            formatedActivities.push({
                id: activity.id,
                name: activity.name,
                xpOrganisation: activity.xpOrganisation,
                xpParticipation: activity.xpParticipation,
                category: activity.category,
                students: students
            });
        }
        res.status(200).json({message: formatedActivities});
    } catch (error) {
        console.error("Error querying the database on getActivities: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};