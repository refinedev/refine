export interface ICategory {
    id: string;
    title: string;
    active: boolean;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
}
