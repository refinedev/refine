import React from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../interfaces";

import { useNotification } from "@hooks";

/**
 * @example
 * const [loading, setLoading] = useState(false);
 * const login = useLogin();
 * const handleClick = {
 *     setLoading(true);
 *     login({ username: 'john', password: 'p@ssw0rd' })
 *         .then(() => setLoading(false));
 * }
 * return <button onClick={handleClick}>Login</button>;
 */

export const useLogin = () => {
    const history = useHistory();
    const authContext = React.useContext<IAuthContext>(AuthContext);
    const notification = useNotification();

    const login = React.useCallback((params: any) => {
        authContext
            .login(params)
            .then(() => {
                return history.push("/");
            })
            .catch(() => {
                notification.error({
                    message: "Login Error",
                    description: "Invalid username or password",
                });
            });
    }, []);

    return login;
};
