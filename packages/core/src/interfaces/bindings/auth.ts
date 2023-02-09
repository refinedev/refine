/**
 * @author aliemir
 *
 * In the current internal structure, sometimes we pass params and args from one function to another,
 * like in case of `check` (formerly `checkAuth`) function, we pass the reject value to `useLogout` hook,
 * which handles the redirect after logout.
 *
 * These actions should be separated,
 *
 * Apps can exist with an optional auth,
 * or do not redirect after logout,
 * or do the redirect but not log out,
 * or do the redirect to a different page than `/login`.
 *
 * To cover all those cases, we should return more information from auth functions.
 *
 * Let's say, they should always resolve, even if user is not authenticated,
 * but have the proper information to handle the situation.
 *
 * like `authenticated: false`, `redirect: '/login'` and `logout: true`
 * which will inform refine that user is not authenticated and should be redirected to `/login` and logout.
 * In some cases, redirect might need to be transferred to other hooks (like `useLogout` hook),
 * but these cases can be handled internally.
 *
 * If the response from `check` is `{ authenticated: false, logout: false, redirect: "/not-authenticated" }`,
 * then the user will be redirected to `/not-authenticated` without logging out.
 *
 * If the response from `check` is `{ authenticated: false, logout: true, redirect: false }`,
 * then the user will be logged out without redirecting.
 *
 * Same goes for `onError` function, it should always resolve.
 */

export type CheckResponse = {
    authenticated: boolean;
    redirect?: string | false;
    logout?: boolean;
};

export type OnErrorResponse = {
    redirect?: string | false;
    logout?: boolean;
};

export type AuthActionResponse = {
    success: boolean;
    redirect?: string | false;
    [key: string]: unknown;
};

export type PermissionResponse = unknown;

export type IdentityResponse = unknown;

export type AuthBindings = {
    login: (params: unknown) => Promise<AuthActionResponse>;
    logout: (params: unknown) => Promise<AuthActionResponse>;
    check: (params?: unknown) => Promise<CheckResponse>;
    onError: (error: unknown) => Promise<OnErrorResponse>;
    register?: (params: unknown) => Promise<AuthActionResponse>;
    forgotPassword?: (params: unknown) => Promise<AuthActionResponse>;
    updatePassword?: (params: unknown) => Promise<AuthActionResponse>;
    getPermissions?: (params?: unknown) => Promise<PermissionResponse>;
    getIdentity?: (params?: unknown) => Promise<IdentityResponse>;
};
