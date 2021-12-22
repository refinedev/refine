export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    category: {
        data: {
            id: string;
            attributes: ICategory;
        };
    };
    content: string;
    locale: string;
    createdAt: string;
}
