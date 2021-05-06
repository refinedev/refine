import React from "react";

import { AuthContext } from "@contexts/auth";
import { useNotification } from "@hooks";
import { useNavigation } from "@hooks/navigation";

import { IAuthContext } from "../../../interfaces";
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
    const { push } = useNavigation();
    const authContext = React.useContext<IAuthContext>(AuthContext);
    const notification = useNotification();

    const login = React.useCallback(
        (params: any) =>
            authContext
                .login(params)
                .then((response) => {
                    push("/");
                    return Promise.resolve(response);
                })
                .catch((error: Error) => {
                    notification.error({
                        message: error.name || "Login Error",
                        description:
                            error.message || "Invalid username or password",
                    });

                    return Promise.reject(error);
                }),
        [push, authContext, notification],
    );

    return login;
};
