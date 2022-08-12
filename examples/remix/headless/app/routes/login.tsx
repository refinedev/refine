import React from "react";
import { useTranslate } from "@pankod/refine-core";

import { login, createUserSession } from "~/session.server";
import { ActionFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";

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
    const translate = useTranslate();
    const [searchParams] = useSearchParams();

    return (
        <>
            <h1>{translate("pages.login.title", "Sign in your account")}</h1>
            <form method="post">
                <input
                    type="hidden"
                    name="redirectTo"
                    value={searchParams.get("to") ?? undefined}
                />
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
                                    name="username"
                                    type="text"
                                    size={20}
                                    autoCorrect="off"
                                    spellCheck={false}
                                    autoCapitalize="off"
                                    autoFocus
                                    required
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
                                    name="password"
                                    required
                                    size={20}
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
    const redirectTo = form.get("redirectTo") || "/";
    const user = await login({ username, password });
    if (!user) {
        return null;
    }

    return createUserSession(user as any, redirectTo as string);
};

export default LoginPage;
