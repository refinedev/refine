import React, { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

/**
 * @example
 * import { usePermissions } from '@pankod/refine';
 *
 * const PostDetail = props => {
 *   const { loaded, permissions } = usePermissions();
 *   if (loaded && permissions == 'editor') {
 *     return <PostEdit {...props} />
 *   } else {
 *     return <PostShow {...props} />
 *   }
 * };
 */

export const usePermissions = () => {
    const { getPermissions } = useContext<IAuthContext>(AuthContext);

    const permissions = React.useCallback(
        () =>
            getPermissions()
                .then((permission: any) => Promise.resolve(permission))
                .catch((error: any) => Promise.reject(error)),
        [],
    );

    return permissions;
};
