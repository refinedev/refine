export interface ICategory {
    id: string;
    title: string;
}

export interface IUser {
    id: string;
}
export interface IPost {
    id: string;
    title: string;
    content: string;
    slug: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
    user: IUser;
}
