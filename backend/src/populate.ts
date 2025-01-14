import prisma from "./prismaClient";
import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function fillDB() {
    try {
        if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_USER) {
            console.error("Admin credential aren't set in the environnement");
            return;
        }
        const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD);

        await prisma.user.upsert({
            where: {
                username: process.env.ADMIN_USER,
            },
            update: {
                password: adminPassword,
            },
            create: {
                username: process.env.ADMIN_USER,
                password: adminPassword,
            },
        });
    } catch(error) {
        console.error("Error populating database: ", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}
