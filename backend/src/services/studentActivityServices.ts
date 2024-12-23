import prisma from "../prismaClient";

export class StudentActivityService {
    async getStudentsByActivityId(id: number) {
        return prisma.studentActivity.findMany({
            where: {
                activityId: id,
            },
        });
    }

    async getActivitiesByStudentId(id: number) {
        return prisma.studentActivity.findMany({
            where: {
                studentId: id
            }
        });
    }
};