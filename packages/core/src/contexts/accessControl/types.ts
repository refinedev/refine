/**
 * @author aliemir
 *
 * `AccessControlProvider` interface, used to define the access control bindings of refine.
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
import { UseQueryOptions } from "@tanstack/react-query";

import { BaseKey } from "../data/types";
import { IResourceItem, ITreeMenu } from "../resource/types";

export type CanResponse = {
  can: boolean;
  reason?: string;
  [key: string]: unknown;
};

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
   * @type {
   *   resource?: [IResourceItem](https://refine.dev/docs/api-reference/core/interfaceReferences/#canparams),
   *   id?: [BaseKey](https://refine.dev/docs/api-reference/core/interfaceReferences/#basekey), [key: string]: any
   * }
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

export type CanFunction = ({
  resource,
  action,
  params,
}: CanParams) => Promise<CanReturnType>;

type AccessControlOptions = {
  buttons?: {
    enableAccessControl?: boolean;
    hideIfUnauthorized?: boolean;
  };
  queryOptions?: UseQueryOptions<CanReturnType>;
};

export interface IAccessControlContext {
  can?: CanFunction;
  options?: AccessControlOptions;
}

export type IAccessControlContextReturnType = {
  can?: CanFunction;
  options: {
    buttons: {
      enableAccessControl: boolean;
      hideIfUnauthorized: boolean;
    };
    queryOptions?: UseQueryOptions<CanReturnType>;
  };
};

export type AccessControlProvider = {
  can: CanFunction;
  options?: AccessControlOptions;
};
