import React, { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { useNavigation } from "@hooks/navigation";

import { IAuthContext } from "../../interfaces";

/**
 * @example
 * import { useAuthenticated } from '@pankod/refine';
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
    const { push } = useNavigation();

    const authenticated = React.useCallback(
        (redirectPath = "/login") =>
            checkAuth().catch(() => {
                return push(redirectPath);
            }),
        [],
    );

    return authenticated;
};
