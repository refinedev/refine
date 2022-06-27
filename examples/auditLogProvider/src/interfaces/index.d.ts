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
export interface ILog {
    id: string;
    action: string;
    resource: string;
    data: any;
    previousData: any;
    timestamp: string;
}
