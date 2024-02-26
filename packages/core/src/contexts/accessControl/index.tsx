import React from "react";

import {
  IAccessControlContext,
  IAccessControlContextReturnType,
} from "./IAccessControlContext";

/** @deprecated default value for access control context has no use and is an empty object. */
export const defaultAccessControlContext: IAccessControlContext = {};

export const AccessControlContext =
  React.createContext<IAccessControlContextReturnType>({
    options: {
      buttons: { enableAccessControl: true, hideIfUnauthorized: false },
    },
  });

export { IAccessControlContext };

export const AccessControlContextProvider: React.FC<
  IAccessControlContext & {
    children?: React.ReactNode;
  }
> = ({ can, children, options }) => {
  return (
    <AccessControlContext.Provider
      value={{
        can,
        options: options
          ? {
              ...options,
              buttons: {
                enableAccessControl: true,
                hideIfUnauthorized: false,
                ...options.buttons,
              },
            }
          : {
              buttons: {
                enableAccessControl: true,
                hideIfUnauthorized: false,
              },
              queryOptions: undefined,
            },
      }}
    >
      {children}
    </AccessControlContext.Provider>
  );
};
