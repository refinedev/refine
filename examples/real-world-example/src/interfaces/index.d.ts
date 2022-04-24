export interface IUser {
    email: string;
    username: string;
    bio: string | null;
    image: string;
    token: string;
}

export type ITag = string;
export interface IArticle {
    slug: string;
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    tagList: ITag[];
    title: string;
    updatedAt: string;
    author: IUser;
}
export interface IProfile {
    email: string;
    username: string;
    bio: string | null;
    image: string;
}
