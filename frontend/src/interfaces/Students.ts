export interface Activity {
    name: string;
    category: string;
    xpOrganisation: number;
    xpParticipation: number;
}

export interface ActivityWithStudents extends Activity {
    students: StudentActivity[];
}

export interface StudentActivity {
    studentId: number;
    role: string;
    present: boolean;
}

export interface Student {
    id: number;
    firstname: string;
    lastname: string;
    promo: number;
    image: string | null;
    activities: Activity[];
}
