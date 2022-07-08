export interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}
