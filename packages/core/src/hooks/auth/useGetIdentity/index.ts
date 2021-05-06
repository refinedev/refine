import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

/**
 * @example
 * import { useGetIdentity } from '@pankod/refine';
 *
 * const PostDetail = props => {
 *   const { loading, userIdentity } = useGetIdentity();
 *   if (loading) return <>Loading...</>;
 *   if (!post.lockedBy || post.lockedBy === userIdentity.id) {
 *     // post isn't locked, or is locked by me
 *     return <PostEdit post={post} />
 *   } else {
 *     // post is locked by someone else and cannot be edited
 *     return <PostShow post={post} />
 *   }
 * };
 */

export const useGetIdentity = () => {
    const { getUserIdentity } = React.useContext<IAuthContext>(AuthContext);

    const userIdentity = React.useCallback(() => {
        if (!getUserIdentity) {
            Promise.reject(
                new Error("Not implemented 'getUserIdentity' on AuthProvider."),
            );
            return;
        }

        return getUserIdentity()
            .then((identity: any) => Promise.resolve(identity))
            .catch((error: any) => Promise.reject(error));
    }, [getUserIdentity]);

    return userIdentity;
};
