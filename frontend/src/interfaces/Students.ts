export interface Activity {
    name: string;
    xpOrganisation: number;
    xpParticipation: number;
    category: string;
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
