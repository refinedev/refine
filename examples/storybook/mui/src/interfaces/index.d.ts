export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft";
    category: ICategory;
}

export interface IPostFilterVariables {
    q: string;
    category: string;
    status: string;
    createdAt: [Dayjs, Dayjs];
}
