export interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
