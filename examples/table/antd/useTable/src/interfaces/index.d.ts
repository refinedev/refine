export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: {
        id: number;
    };
}

interface ICategory {
    id: string;
    title: string;
}
