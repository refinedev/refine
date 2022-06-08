export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}
