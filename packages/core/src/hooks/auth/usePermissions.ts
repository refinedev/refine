import React, { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../interfaces";

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

interface State {
    loading: boolean;
    loaded: boolean;
    permissions?: object;
    error?: string;
}

export const usePermissions = (): State => {
    const [state, setState] = React.useState<State>({
        loading: true,
        loaded: false,
    });

    const { getPermissions } = useContext<IAuthContext>(AuthContext);

    React.useEffect(() => {
        getPermissions({})
            .then((permissions) => {
                setState({ loading: false, loaded: true, permissions });
            })
            .catch((error) => {
                setState({
                    loading: false,
                    loaded: true,
                    error,
                });
            });
    }, [getPermissions, setState]);
    return state;
};
