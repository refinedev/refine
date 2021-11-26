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

export interface IUserAvatar {
    name: string;
    url: string;
    size: number;
    uid: string;
}

export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: IUserAvatar[];
}
