export interface CategoryItem {
    title: string;
    xpOrganisation: string;
    xpParticipation: string;
}

export interface Category {
    name: string;
    items: CategoryItem[];
}