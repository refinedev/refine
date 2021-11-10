type CanParams = {
    resource: string;
    action: string;
    params: any;
};

export interface IRbacContext {
    can: ({ resource, action, params }: CanParams) => boolean;
}
