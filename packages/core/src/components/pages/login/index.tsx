import React, { useState } from "react";

import { useLogin, useTranslate } from "@hooks";
import { useActiveAuthProvider } from "@definitions/helpers";
export interface ILoginForm {
  username: string;
  password: string;
}

/**
 * @deprecated LoginPage is deprecated. Use AuthPage instead. @see {@link https://refine.dev/docs/core/components/auth-page} for more details.
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/components/refine-config/#loginpage} for more details.
 */
export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<ILoginForm>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  return (
    <>
      <h1>{translate("pages.login.title", "Sign in your account")}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ username, password });
        }}
      >
        <table>
          <tbody>
            <tr>
              <td>
                {translate("pages.login.username", undefined, "username")}:
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
                  onChange={(e) => setUsername(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                {translate("pages.login.password", undefined, "password")}:
              </td>
              <td>
                <input
                  type="password"
                  required
                  size={20}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
