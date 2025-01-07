import prisma from "../prismaClient";

export class StudentService {
    async findStudentById(id: number) {
        return await prisma.student.findUnique({
            where: {
                id: id
            }
        });
    }

    async findStudentByEmail(email: string) {
        return await prisma.student.findUnique({
            where: {
                email: email
            }
        });
    }

    async findStudentByFirstName(firstname: string) {
        return await prisma.student.findMany({
            where: {
                firstname: firstname
            }
        });
    }

    async findStudentByLastName(lastname: string) {
        return await prisma.student.findMany({
            where: {
                lastname: lastname
            }
        });
    }

    async findAllStudent() {
        return await prisma.student.findMany();
    }

    async createStudent(firstname: string, lastname: string, email: string, promo: number, image: Buffer, imageType: string) {
        return await prisma.student.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                promotion: promo,
                image: image,
                imageType: imageType
            }
        });
    }

    async updateStudent(id: number, firstname: string, lastname: string, email: string, promo: number, image: Buffer, imageType: string) {
        return await prisma.student.update({
            where: {
                id: id
            },
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                promotion: promo,
                image: image,
                imageType: imageType
            }
        });
    }

    async deleteStudent(id: number) {
        return await prisma.student.delete({
            where: {
                id: id
            }
        });
    }
}