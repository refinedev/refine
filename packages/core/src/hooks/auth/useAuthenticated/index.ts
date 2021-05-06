import React, { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { useNavigation } from "@hooks/navigation";

import { IAuthContext } from "../../../interfaces";

/**
 * @example
 * import { useAuthenticated } from '@pankod/refine';
 *
 * const checkAuth = useAuthenticated();
 * const [authenticated, setAuthenticated] = useState(true);
 * useEffect(() => {
 *   checkAuth()
 *     .then(() => setAuthenticated(true))
 *     .catch(() => setAuthenticated(false));
 *   }, []);
 * return authenticated ? <Foo /> : <BarNotAuthenticated />;
 *
 */

export const useAuthenticated = () => {
    const { checkAuth, checkError } = useContext<IAuthContext>(AuthContext);

    const authenticated = React.useCallback(
        () =>
            checkAuth()
                .then(() => true)
                .catch((error) => {
                    checkError(error);
                    return false;
                }),
        [],
    );

    return authenticated;
};
