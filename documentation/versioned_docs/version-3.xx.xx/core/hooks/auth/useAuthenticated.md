---
id: useAuthenticated
title: useAuthenticated
siderbar_label: useAuthenticated
description: useAuthenticated data hook from refine is a modified version of react-query's useMutation for create mutations
---

`useAuthenticated` calls the `checkAuth` method from the[`authProvider`](/core/providers/auth-provider.md) under the hood. 

It returns the result of `react-query`'s `useQuery` which includes many properties, some of which being `isSuccess` and `isError`.  
Data that is resolved from the `useAuthenticated` will be returned as the `data` in the query result.


## Usage

`useAuthenticated` can be useful when you want to ask for authentication to grant access to [custom pages](/guides-and-concepts/custom-pages.md) manually.

We have used this hook in refine's [`<Authenticated>`](/core/components/auth/authenticated.md) component which allows only authenticated users to access the page or any part of the code.

We will demonstrate a similar basic implementation below. Imagine that you have public page but you want to make some specific fields private.

We have a logic in [`authProvider`](/core/providers/auth-provider.md)'s `checkAuth` method like below.

```tsx
const authProvider: AuthProvider = {
  ...
    // highlight-start
    checkAuth: () => {
        localStorage.getItem("username")
                ? Promise.resolve()
                : Promise.reject(),
    },
    // highlight-end
  ...
};
```
<br/>

Let's create a wrapper component that renders children if `checkAuth` method returns the Promise resolved.

```tsx  title="components/authenticated.tsx"
// highlight-next-line
import { useAuthenticated, useNavigation } from "@pankod/refine";

export const Authenticated: React.FC<AuthenticatedProps> = ({
    children,
    fallback,
    loading,
}) => {
    // highlight-next-line
    const { isSuccess, isLoading, isError } = useAuthenticated();

    const { replace } = useNavigation();

    if (isLoading) {
        return <>{loading}</> || null;
    }

    if (isError) {
        if (!fallback) {
            replace("/");
            return null;
        }

        return <>{fallback}</>;
    }

    if (isSuccess) {
        return <>{children}</>;
    }

    return null;
};

type AuthenticatedProps = {
    fallback?: React.ReactNode;
    loading?: React.ReactNode;
};
```

<br />

Now, only authenticated users can see the price field.

```tsx title="components/postShow"
import { Typography, Show } from "@pankod/refine-antd";

// highlight-next-line
import { Authenticated } from "components/authenticated"

const { Title, Text } = Typography;

export const PostShow: React.FC = () => (
    <Show>
        <Title>Status</Title>
        <Text>Approved</Text>
        // highlight-start
        <Authenticated>
            <Title>Price</Title>
            <Text>20</Text>
        </Authenticated>
        // highlight-end
    </Show>
)
```



:::caution
This hook can only be used if the `authProvider` is provided.
:::
