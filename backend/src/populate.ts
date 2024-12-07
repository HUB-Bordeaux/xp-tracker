import prisma from "./prismaClient";
import bcrypt from 'bcrypt'
import fs from 'fs/promises';
import path from "path";

export async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function fillDB() {
    try {
        const adminPassword = await hashPassword('admin');
        const testPassword = await hashPassword('test');

        await prisma.user.createMany({
            data: [
                { username: 'admin', password: adminPassword},
                { username: 'test', password: testPassword},
            ],
        });
    } catch(error) {
        console.error("Error populating database: ", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}
