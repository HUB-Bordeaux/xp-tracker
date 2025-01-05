import type { studentActivityInfo } from "./studentActivityInterface";

export interface activityInfo {
    name: string;
    xpOrganisation: number;
    xpParticipation: number;
    category: string;
    students: studentActivityInfo[];
}
