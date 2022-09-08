import React from "react";

export type ShowCase = {
    title: string;
    description: string;
    buttons: {
        text: string;
        link: string;
        image: string;
        icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        default?: boolean;
    }[];
};
export type ShowCases = ShowCase[];

export type Example = {
    title: string;
    description: string;
    image: string;
    button: {
        text: string;
        link: string;
    };
};
export type Examples = Example[];
