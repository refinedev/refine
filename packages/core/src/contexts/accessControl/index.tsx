import React from "react";

import { IAccessControlContext } from "./IAccessControlContext";

/** @deprecated default value for access control context has no use and is an empty object. */
export const defaultAccessControlContext: IAccessControlContext = {};

export const AccessControlContext = React.createContext<
    Partial<IAccessControlContext> &
        Required<Pick<IAccessControlContext, "options">>
>({
    options: {
        buttons: { enableAccessControl: true, hideIfUnauthorized: false },
    },
});

const accessControlProvider: IAccessControlContext = {
    can: ({ resource, action, params }: CanParams): Promise<CanReturnType> => ({
        can: true,
    }),
    // Global settings
    options: {
        buttons: {
            enableAccessControl: true,
            hideIfUnauthorized: true,
        },
    },
};

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
                      },
            }}
        >
            {children}
        </AccessControlContext.Provider>
    );
};
