import prisma from "../prismaClient";

export class ActivityService {
    async findAllActivities() {
        return await prisma.activity.findMany();
    }

    async findActivityById(id: number) {
        return await prisma.activity.findUnique({
            where: {
                id: id
            }
        });
    }

    async findActivitiesByCategory(category: string) {
        return await prisma.activity.findMany({
            where: {
                category: category
            }
        })
    }

    async createActivity(name: string, xpOrganisation: number, xpParticipation: number, category: string) {
        return await prisma.activity.create({
            data: {
                name: name,
                xpOrganisation: xpOrganisation,
                xpParticipation: xpParticipation,
                category: category
            }
        })
    }

    async updateActivity(id: number, name: string, xpOrganisation: number, xpParticipation: number, category: string) {
        return await prisma.activity.update({
            where: {
                id: id
            },
            data: {
                name: name,
                xpOrganisation: xpOrganisation,
                xpParticipation: xpParticipation,
                category: category
            }
        })
    }

    async deleteActivity(id: number) {
        return await prisma.activity.delete({
            where: {
                id: id
            }
        })
    }
};