import React from "react";

export type CanParams = {
    resource: string;
    action: string;
    params?: any;
};

export type CanReturnType = {
    can: boolean;
    reason?: string;
};
export interface IAccessControlContext {
    can: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
}
