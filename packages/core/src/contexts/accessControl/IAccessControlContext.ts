import { BaseKey, IResourceItem, ITreeMenu } from "../../interfaces";

export type CanParams = {
    /**
     * Resource name for API data interactions
     */
    resource?: string;
    /**
     * Intended action on resource
     */
    action: string;
    /**
     * Parameters associated with the resource
     * @type { resource?: [IResourceItem](https://refine.dev/docs/api-reference/core/interfaceReferences/#canparams), id?: [BaseKey](https://refine.dev/docs/api-reference/core/interfaceReferences/#basekey), [key: string]: any }
     */
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
