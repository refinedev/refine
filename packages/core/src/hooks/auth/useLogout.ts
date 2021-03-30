import React from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../interfaces";

/**
 * @example
 * import { useLogout } from 'readmin';
 *
 * const logout = useLogout();
 * const handleClick = () => logout();
 * return <button onClick={handleClick}>Logout</button>;
 */

export const useLogout = (redirectPath = "/login") => {
    const history = useHistory();
    const authContext = React.useContext<IAuthContext>(AuthContext);

    const logout = React.useCallback(() => {
        authContext.logout().then(() => {
            return history.push(redirectPath);
        });
    }, []);

    return logout;
};
