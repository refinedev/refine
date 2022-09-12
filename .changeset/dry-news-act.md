---
"@pankod/refine-core": patch
---

Add register function to `AuthContextProvider` for invalidate auth store queries.

```tsx
const invalidateAuthStore = () => {
    queryClient.invalidateQueries(["useAuthenticated"]);
    queryClient.invalidateQueries(["getUserIdentity"]);
    queryClient.invalidateQueries(["usePermissions"]);
};

const registerFunc = async (params: any) => {
    try {
        const result = await authOperations.register?.(params);

        invalidateAuthStore();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

<AuthContext.Provider
    value={{
        ...authOperations,
        login: loginFunc,
        logout: logoutFunc,
        checkAuth: checkAuthFunc,
        //highlight-next-line
        register: registerFunc,
        isProvided,
    }}
>
    {children}
</AuthContext.Provider>;
```
