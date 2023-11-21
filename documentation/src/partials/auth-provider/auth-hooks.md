| Hook                                       | Method           | Description                         |
| ------------------------------------------ | ---------------- | ----------------------------------- |
| [useRegister][use-register]                | `register`       | Register a new user.                |
| [useLogin][use-login]                      | `login`          | Authenticate and log in a user.     |
| [useIsAuthenticated][use-is-authenticated] | `checkAuth`      | Check if the user is authenticated. |
| [useLogout][use-logout]                    | `logout`         | Log out the current user.           |
| [useOnError][use-on-error]                 | `handleError`    | Handle authentication errors.       |
| [useGetIdentity][use-get-identity]         | `getIdentity`    | Retrieve the identity of the user.  |
| [useUpdatePassword][use-update-password]   | `updatePassword` | Update the user's password.         |
| [useForgotPassword][use-forgot-password]   | `forgotPassword` | Initiate a password reset process.  |
| [usePermissions][use-permissions]          | `getPermissions` | Get the permissions of the user.    |

[use-login]: /docs/api-reference/core/hooks/authentication/useLogin/
[use-logout]: /docs/api-reference/core/hooks/authentication/useLogout/
[use-is-authenticated]: /docs/api-reference/core/hooks/authentication/useIsAuthenticated/
[use-on-error]: /docs/api-reference/core/hooks/authentication/useOnError/
[use-get-identity]: /docs/api-reference/core/hooks/authentication/useGetIdentity/
[use-permissions]: /docs/api-reference/core/hooks/authentication/usePermissions/
[use-register]: /docs/api-reference/core/hooks/authentication/useRegister/
[use-forgot-password]: /docs/api-reference/core/hooks/authentication/useForgotPassword/
[use-update-password]: /docs/api-reference/core/hooks/authentication/useUpdatePassword/
