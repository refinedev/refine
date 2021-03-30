import React, { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "@interfaces";
import { useHistory } from "react-router-dom";

/**
 * @example
 * import { useAuthenticated } from 'readmin';
 *
 * const checkAuth = useAuthenticated();
 * const [authenticated, setAuthenticated] = useState(true);
 * useEffect(() => {
 *   checkAuth({}, false)
 *     .then(() => setAuthenticated(true))
 *     .catch(() => setAuthenticated(false));
 *   }, []);
 * return authenticated ? <Foo /> : <BarNotAuthenticated />;
 *
 */

export const useAuthenticated = () => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const history = useHistory();

    const authenticated = React.useCallback(
        (redirectPath = "/login") =>
            checkAuth().catch(() => {
                return history.push(redirectPath);
            }),
        [],
    );

    return authenticated;
};
