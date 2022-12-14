export interface IPost {
    id: string;
    title: string;
}

export interface ICategory {
    id: string;
    title: string;
}

export interface ICsvPost {
    title: string;
    content: string;
    categoryId: string;
}
