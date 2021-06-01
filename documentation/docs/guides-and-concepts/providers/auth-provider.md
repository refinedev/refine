---
id: auth-provider
title: Auth Provider
sidebar_label: Auth Provider
---

```tsx title="src/App.ts"
import { AuthProvider } from "@pankod/refine";

const App = () => {
    const axiosInstance = axios.create();

    const authProvider: AuthProvider = {
        login: async ({ username, password }) => {
            const { data, status } = await axiosInstance.post(
                "auth",
                username,
                password,
            );
            if (status === 200) {
                localStorage.setItem("token", data.jwt);

                // set header axios instance
                axiosInstance.defaults.headers = {
                    Authorization: `Bearer ${data.jwt}`,
                };

                return Promise.resolve;
            }
            return Promise.reject;
        },
        //...
    };

    return <Admin authProvider={authProvider}>...</Admin>;
};

export default App;
```
