export type CanParams = {
    resource: string;
    action: string;
    params?: any;
};

export interface IAccessControlContext {
    can: ({ resource, action, params }: CanParams) => Promise<boolean>;
}
