export type Example = {
    title: string;
    description: string;
    image: string;
    button: {
        text: string;
        link: string;
    };
    isExternal?: boolean;
};
export type Examples = Example[];
