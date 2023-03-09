export interface IPost {
    id: number;
    title: string;
    content: string;
    category: any;
    publishedAt: string;
    createdAt: string;
}

export interface IIdentity {
    id: number;
    name: string;
    email: string;
    avatar: string;
}
