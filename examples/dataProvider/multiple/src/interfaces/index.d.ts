export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
}

export interface IProducts {
    id: string;
    name: string;
    price: number;
    description: string;
}
