import { ICategory } from "./ICategory";

export interface IPost {
    title: string;
    status: "published" | "draft";
    category: ICategory;
    createdAt: string;
}
