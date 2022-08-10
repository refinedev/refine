import React, { useState } from "react";
import { useTranslate } from "@pankod/refine-core";

import { login, createUserSession } from "~/session.server";
import { ActionFunction } from "@remix-run/node";

export interface ILoginForm {
    username: string;
    password: string;
}

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#loginpage} for more details.
 */
const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const translate = useTranslate();

    return (
        <>
            <h1>{translate("pages.login.title", "Sign in your account")}</h1>
            <form method="post">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {translate(
                                    "pages.login.username",
                                    undefined,
                                    "username",
                                )}
                                :
                            </td>
                            <td>
                                <input
                                    type="text"
                                    size={20}
                                    autoCorrect="off"
                                    spellCheck={false}
                                    autoCapitalize="off"
                                    autoFocus
                                    required
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {translate(
                                    "pages.login.password",
                                    undefined,
                                    "password",
                                )}
                                :
                            </td>
                            <td>
                                <input
                                    type="password"
                                    required
                                    size={20}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <input type="submit" value="login" />
            </form>
        </>
    );
};

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username") as string;
    const password = form.get("password") as string;
    const user = await login({ username, password });
    console.log({ user });
    if (!user) {
        return null;
    }
    // if there is a user, create their session and redirect to /jokes
    return createUserSession("1", "/");
};

export default LoginPage;
