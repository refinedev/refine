export interface ILanguage {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    language: string;
}
