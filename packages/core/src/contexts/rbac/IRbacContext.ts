type CanParams = {
    resource: string;
    action: string;
    params: any;
};

export interface IRbacProvider {
    can?: ({ resource, action, params }: CanParams) => boolean;
}

export interface IRbacContext {
    can: ({ resource, action, params }: CanParams) => boolean;
}
