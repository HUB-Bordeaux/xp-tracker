export interface Student {
    id: number;
    firstname: string;
    lastname: string;
    promo: number;
    image: string | null;
    activities: Activity[];
}

export interface Activity {
    name: string;
    category: string;
    xpOrganisation: number;
    xpParticipation: number;
    role: string;
}

export interface ActivityWithStudents extends Activity {
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
    role: string;
    present: boolean;
}
