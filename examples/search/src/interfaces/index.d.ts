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

export interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
}

export interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}
