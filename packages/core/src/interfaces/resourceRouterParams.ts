export type ResourceRouterParams = {
    resource: string;
    id?: string;
    action: "show" | "edit" | "create" | "clone" | undefined;
};
