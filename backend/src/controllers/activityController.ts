import type { Request, Response } from "express";
import { ActivityService } from "../services/activityServices";
import { StudentActivityService } from "../services/studentActivityServices";
import { StudentService } from "../services/studentServices";
import type { activityInfo } from "../interfaces/activityInterface";

const studentService = new StudentService();
const studentActivityService = new StudentActivityService();
const activityService = new ActivityService();

export const getAllActivities = async (req: Request, res: Response) => {
    try {
        const activities = await activityService.findAllActivities();
        const formatedActivities: any[] = [];

        for (const activity of activities) {
            const studentActivities = await studentActivityService.getStudentsByActivityId(activity.id);
            const students: any[] = [];
            for (const studentActivity of studentActivities) {
                const student = await studentService.findStudentById(studentActivity.studentId);
                if (student === null)
                    continue;
                students.push({
                    id: student.id,
                    image: student.image.toString('base64'),
                    imageType: student.imageType,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    email: student.email,
                    promotion: student.promotion,
                    role: studentActivity.role,
                    present: studentActivity.present
                })
            }
            formatedActivities.push({
                id: activity.id,
                name: activity.name,
                xpOrganisation: activity.xpOrganisation,
                xpParticipation: activity.xpParticipation,
                category: activity.category,
                students: students
            });
        }
        res.status(200).json(formatedActivities);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getAllHackathons = async (req: Request, res: Response) => {
    try {
        const activities = await activityService.findActivitiesByCategory("hackathon");
        const formatedActivities: any[] = [];

        for (const activity of activities) {
            const studentActivities = await studentActivityService.getStudentsByActivityId(activity.id);
            const students: any[] = [];
            for (const studentActivity of studentActivities) {
                const student = await studentService.findStudentById(studentActivity.studentId);
                if (student === null)
                    continue;
                students.push({
                    id: student.id,
                    image: student.image.toString('base64'),
                    imageType: student.imageType,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    email: student.email,
                    promotion: student.promotion,
                    role: studentActivity.role,
                    present: studentActivity.present
                })
            }
            formatedActivities.push({
                id: activity.id,
                name: activity.name,
                xpOrganisation: activity.xpOrganisation,
                xpParticipation: activity.xpParticipation,
                category: activity.category,
                students: students
            });
        }
        res.status(200).json(formatedActivities);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getAllTalks = async (req: Request, res: Response) => {
    try {
        const activities = await activityService.findActivitiesByCategory("talk");
        const formatedActivities: any[] = [];

        for (const activity of activities) {
            const studentActivities = await studentActivityService.getStudentsByActivityId(activity.id);
            const students: any[] = [];
            for (const studentActivity of studentActivities) {
                const student = await studentService.findStudentById(studentActivity.studentId);
                if (student === null)
                    continue;
                students.push({
                    id: student.id,
                    image: student.image.toString('base64'),
                    imageType: student.imageType,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    email: student.email,
                    promotion: student.promotion,
                    role: studentActivity.role,
                    present: studentActivity.present
                })
            }
            formatedActivities.push({
                id: activity.id,
                name: activity.name,
                xpOrganisation: activity.xpOrganisation,
                xpParticipation: activity.xpParticipation,
                category: activity.category,
                students: students
            });
        }
        res.status(200).json(formatedActivities);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getAllUserGroups = async (req: Request, res: Response) => {
    try {
        const activities = await activityService.findActivitiesByCategory("usergroup");
        const formatedActivities: any[] = [];

        for (const activity of activities) {
            const studentActivities = await studentActivityService.getStudentsByActivityId(activity.id);
            const students: any[] = [];
            for (const studentActivity of studentActivities) {
                const student = await studentService.findStudentById(studentActivity.studentId);
                if (student === null)
                    continue;
                students.push({
                    id: student.id,
                    image: student.image.toString('base64'),
                    imageType: student.imageType,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    email: student.email,
                    promotion: student.promotion,
                    role: studentActivity.role,
                    present: studentActivity.present
                })
            }
            formatedActivities.push({
                id: activity.id,
                name: activity.name,
                xpOrganisation: activity.xpOrganisation,
                xpParticipation: activity.xpParticipation,
                category: activity.category,
                students: students
            });
        }
        res.status(200).json(formatedActivities);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getAllFreeProjects = async (req: Request, res: Response) => {
    try {
        const activities = await activityService.findActivitiesByCategory("freeproject");
        const formatedActivities: any[] = [];

        for (const activity of activities) {
            const studentActivities = await studentActivityService.getStudentsByActivityId(activity.id);
            const students: any[] = [];
            for (const studentActivity of studentActivities) {
                const student = await studentService.findStudentById(studentActivity.studentId);
                if (student === null)
                    continue;
                students.push({
                    id: student.id,
                    image: student.image.toString('base64'),
                    imageType: student.imageType,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    email: student.email,
                    promotion: student.promotion,
                    role: studentActivity.role,
                    present: studentActivity.present
                })
            }
            formatedActivities.push({
                id: activity.id,
                name: activity.name,
                xpOrganisation: activity.xpOrganisation,
                xpParticipation: activity.xpParticipation,
                category: activity.category,
                students: students
            });
        }
        res.status(200).json(formatedActivities);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getOneActivity = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (id === undefined) {
        res.status(400).json({message: "Activity ID not given"});
        return
    }
    try {
        const activity = await activityService.findActivityById(+id);
        if (!activity) {
            res.status(404).json({message: "Activity not found"});
            return
        }
        const studentActivities = await studentActivityService.getStudentsByActivityId(+id);
        const students: any[] = [];
        for (const studentActivity of studentActivities) {
            const student = await studentService.findStudentById(studentActivity.studentId);
            if (student === null)
                continue;
            students.push({
                id: student.id,
                image: student.image.toString('base64'),
                imageType: student.imageType,
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                promotion: student.promotion,
                role: studentActivity.role,
                present: studentActivity.present
            })
        }
        const formatedActivity = {
            id: activity.id,
            name: activity.name,
            xpOrganisation: activity.xpOrganisation,
            xpParticipation: activity.xpParticipation,
            category: activity.category,
            students: students
        }
        res.status(200).json(formatedActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createActivity = async (req: Request, res: Response) => {
    const activity : activityInfo = req.body;

    try {
        const createdActivity = await activityService.createActivity(activity.name, activity.xpOrganisation, activity.xpParticipation, activity.category)
        for (const student of activity.students) {
            await studentActivityService.createActivityStudent(student.studentId, createdActivity.id, student.role, student.present);
        }
        res.status(200).json({message: createdActivity})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateActivity = async (req: Request, res: Response) => {
    const id = req.params.id
    const activity : activityInfo = req.body;

    if (id === undefined) {
        res.status(400).json({message: "Activity ID not given"});
        return;
    }
    try {
        await studentActivityService.deleteStudentActivityByActivityId(+id);
        const updatedActivity = await activityService.updateActivity(+id, activity.name, activity.xpOrganisation, activity.xpParticipation, activity.category);
        if (!updatedActivity) {
            res.status(404).json({message: "Activity not found"});
            return;
        }
        for (const student of activity.students) {
            await studentActivityService.createActivityStudent(student.studentId, +id, student.role, student.present);
        }
        res.status(200).json({message: "Activity updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
}

export const deleteActivity = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (id === undefined) {
        res.status(400).json({message: "Activity ID not given"});
        return;
    }
    try {
        const activity = await activityService.deleteActivity(+id);
        if (!activity) {
            res.status(404).json({message: "Activity not found"});
            return;
        }
        await studentActivityService.deleteStudentActivityByActivityId(+id);
        res.status(200).json({message: "Activity deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
}