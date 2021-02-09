import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "@interfaces";

/**
 * @example
 * import { useGetIdentity } from 'readmin';
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

const defaultIdentity = {
    id: "",
    fullName: null,
};

export const useGetIdentity = () => {
    const [state, setState] = React.useState<{
        loading: boolean;
        loaded: boolean;
        userIdentity?: any;
        error?: any;
    }>({
        loading: true,
        loaded: false,
    });

    const { getUserIdentity } = React.useContext<IAuthContext>(AuthContext);

    React.useEffect(() => {
        if (typeof getUserIdentity === "function") {
            getUserIdentity()
                .then((userIdentity) => {
                    setState({
                        loading: false,
                        loaded: true,
                        userIdentity: userIdentity || defaultIdentity,
                    });
                })
                .catch((error) => {
                    setState({
                        loading: false,
                        loaded: true,
                        error,
                    });
                });
        }
    }, [getUserIdentity, setState]);
    return state;
};
