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
};