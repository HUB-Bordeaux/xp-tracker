import prisma from "./prismaClient";
import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function fillDB() {
    try {
        const adminPassword = await hashPassword('admin');

        await prisma.user.createMany({
            data: [
                { username: 'admin', password: adminPassword},
            ],
        });
    } catch(error) {
        console.error("Error populating database: ", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}
