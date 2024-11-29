import prisma from "../prismaClient";

export class UserService {
    async findUserByUsername(username: string) {
        return await prisma.user.findUnique({
            where: {username},
        });
    }

    async registerUser(username: string, password: string) {
        const existingUser = await prisma.user.findUnique({
            where: {username},
        });

        if (existingUser)
            throw new Error("Username already exists");

        return await prisma.user.create({
            data: {username, password},
        });
    }

    async getAllUsers() {
        return await prisma.user.findMany({
            select: {id: true, username: true, password: false},
        });
    }
}