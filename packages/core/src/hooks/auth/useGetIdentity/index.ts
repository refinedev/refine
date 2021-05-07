import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useQuery } from "react-query";

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

    const queryResponse = useQuery("getUserIdentity", getUserIdentity!, {
        enabled: !!getUserIdentity,
    });

    return queryResponse;
};
