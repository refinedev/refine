export interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
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
