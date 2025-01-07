export interface CategoryItem {
    title: string;
    role: string;
    xpOrganisation: string;
    xpParticipation: string;
}

export interface Category {
    name: string;
    items: CategoryItem[];
}