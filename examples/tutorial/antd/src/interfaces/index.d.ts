export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
}
