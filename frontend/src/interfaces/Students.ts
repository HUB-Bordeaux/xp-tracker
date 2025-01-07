export interface Student {
    id: number;
    firstname: string;
    lastname: string;
    promo: number;
    image: string | null;
    imageType: string | null;
    activities: ActivityInfo[];
}

export interface ActivityInfo {
    name: string;
    category: string;
    xpOrganisation: number;
    xpParticipation: number;
    role: string;
    present: boolean;
}

export interface ActivityWithStudents extends ActivityInfo {
    students: StudentActivityGet[];
}

export interface StudentActivityPost {
    studentId: number;
    role: string;
    present: boolean;
}

export interface StudentActivityGet {
    id: number;
    firstname: string;
    lastname: string;
    promo: number;
    image: string | null;
    activities: ActivityInfo[];
}
