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

export interface ILoginDto {
    email?: string;
    password?: string;
    provider?: "google" | "github";
}

export interface IRegisterDto {
    name: string;
    email: string;
    password: string;
}
