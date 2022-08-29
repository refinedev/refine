export type IntegrationsType = {
    [key: string]: Integration[];
};

export type Integration = {
    name: string;
    icon: string;
    description: string;
    url?: string;
    status: string;
    contributors?: contributor[];
};

export type contributor = {
    name: string;
    url: string;
};
