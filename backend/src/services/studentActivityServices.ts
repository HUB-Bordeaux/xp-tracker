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

    async createActivityStudent(studentId: number, activityId: number, role: string, present: boolean) {
        return prisma.studentActivity.create({
            data: {
                studentId: studentId,
                activityId: activityId,
                role: role,
                present: present,
            }
        })
    }

    async deleteStudentActivityByActivityId(id: number) {
        return prisma.studentActivity.deleteMany({
            where: {
                activityId: id
            }
        })
    }

    async deleteStudentActivityByStudentId(id: number) {
        return prisma.studentActivity.deleteMany({
            where: {
                studentId: id
            }
        })
    }
};