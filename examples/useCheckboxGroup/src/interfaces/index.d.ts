export interface ITag {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    tags: Array<string>;
}
