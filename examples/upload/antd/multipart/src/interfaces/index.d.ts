export interface UploadFile {
    name: string;
    url: string;
    size: number;
    uid: string;
}

export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    image: UploadFile[];
    category: ICategory;
}
