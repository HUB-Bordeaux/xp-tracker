import prisma from "../prismaClient";

export class UserService {
    async findUserByUsername(username: string) {
        return await prisma.user.findUnique({
            where: {
                username: username
            }
        });
    }

    async findUserByID(id: number) {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }

    async updateUserByID(id: number, username: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!user)
            throw new Error("User does not exist")
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username: username,
                password: password,
            }
        })
    }

    async registerUser(username: string, password: string) {
        const existingUser = await prisma.user.findUnique({
            where: {username},
        });

        if (existingUser)
            throw new Error("User already exists");

        return await prisma.user.create({
            data: {username, password},
        });
    }

    async getAllUsers() {
        return await prisma.user.findMany({
            select: {id: true, username: true, password: false},
        });
    }

    async deleteUser(id: number) {
        return await prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}