/**
 * @author aliemir
 *
 * `AccessControlBindings` interface, used to define the access control bindings of refine.
 *
 * Currently, there's no change in the interface, but only in the `params.resource` property.
 *
 * This also had `{ children?: ITreeMenu[] }` type extension but we can remove it now.
 *
 * There's an error behind this extension, since we're using `Tanstack Query` to check the `can` function,
 * params are stringified and Nodes can't be stringified properly, which throws an error.
 *
 * These kinds of errors should be handled by the user of the `can` function, not by the `can` function itself.
 *
 * In this case, its the `CanAccess` component, which wraps the `can` function and is used in the `Sider` components.
 * `Sider` should sanitize the `params.resource` property and remove the `children` property (if exists).
 *
 * This may also apply to `resource.icon` property.
 *
 */

import { IResourceItem } from "@contexts/resource";
import { BaseKey } from "src";

export type CanParams = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Intenden action on resource
     */
    action: string;
    /**
     * Parameters associated with the resource
     * @type { resource?: [IResourceItem](https://refine.dev/docs/api-reference/core/interfaceReferences/#canparams), id?: [BaseKey](https://refine.dev/docs/api-reference/core/interfaceReferences/#basekey), [key: string]: any }
     */
    params?: {
        resource?: IResourceItem;
        id?: BaseKey;
        [key: string]: unknown;
    };
};

export type CanResponse = {
    can: boolean;
    reason?: string;
    [key: string]: unknown;
};

export type AccessControlBindings = {
    can: (params: CanParams) => Promise<CanResponse>;
};
