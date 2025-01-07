export interface CategoryItem {
    title: string;
    role: string;
    xpOrganisation: string;
    xpParticipation: string;
    present: boolean;
}

export interface Category {
    name: string;
    items: CategoryItem[];
}