import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../interfaces";
import { useNavigation } from "@hooks/navigation";

/**
 * @example
 * import { useLogout } from 'readmin';
 *
 * const logout = useLogout();
 * const handleClick = () => logout();
 * return <button onClick={handleClick}>Logout</button>;
 */

export const useLogout = (redirectPath = "/login") => {
    const { push } = useNavigation();
    const authContext = React.useContext<IAuthContext>(AuthContext);

    const logout = React.useCallback(() => {
        authContext.logout().then(() => {
            return push(redirectPath);
        });
    }, []);

    return logout;
};
