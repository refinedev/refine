export enum PostStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    REJECTED = "rejected",
}

export interface Image {
    url: string;
    name: string;
    status: string;
    type: string;
    uid: string;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    hit: number;
    category: number;
    user: { id: number };
    status: "published" | "draft" | "rejected";
    createdAt: string;
    publishedAt: string;
    image: Image[];
    tags: number[];
    language: number;
}

export interface Avatar {
    name: string;
    percent: number;
    size: number;
    status: string;
    type: string;
    uid: string;
    url: string;
}

export interface User {
    id: number;
    firstName: string;
    email: string;
    lastName: string;
    status: boolean;
    birthday: string;
    avatar: Avatar[];
}

export interface Tag {
    id: number;
    title: string;
}

export type PostForm = Pick<Post, "title" | "content">;
