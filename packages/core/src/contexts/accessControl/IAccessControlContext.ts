import { BaseKey, IResourceItem, ITreeMenu } from "../../interfaces";

export type CanParams = {
    resource: string;
    action: string;
    params?: {
        resource?: IResourceItem & { children?: ITreeMenu[] };
        id?: BaseKey;
        [key: string]: any;
    };
};

export type CanReturnType = {
    can: boolean;
    reason?: string;
};
export interface IAccessControlContext {
    can?: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
}

export type AccessControlProvider = Required<IAccessControlContext>;
