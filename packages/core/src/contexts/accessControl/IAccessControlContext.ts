import { BaseKey, IResourceItem, ITreeMenu } from "../../interfaces";
import { UseQueryOptions } from "@tanstack/react-query";

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
  options?: {
    buttons?: {
      enableAccessControl?: boolean;
      hideIfUnauthorized?: boolean;
    };
    queryOptions?: UseQueryOptions<CanReturnType>;
  };
}

export interface IAccessControlContextReturnType {
  can?: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
  options: {
    buttons: {
      enableAccessControl?: boolean;
      hideIfUnauthorized?: boolean;
    };
    queryOptions?: UseQueryOptions<CanReturnType>;
  };
}

export type AccessControlProvider = Partial<IAccessControlContext> &
  Required<Pick<IAccessControlContext, "can">>;
