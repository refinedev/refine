export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    hit: number;
    category: ICategory;
}

export interface IPostFilterVariables {
    category: string;
    createdAt: [Dayjs, Dayjs];
}
