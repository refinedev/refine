---
id: useAuthenticated
title: useAuthenticated
siderbar_label: useAuthenticated
description: useAuthenticated data hook from refine is a modified version of react-query's useMutation for create mutations
---

`useAuthenticated` calls `checkAuth` method from [`authProvider`](/docs/guides-and-concepts/providers/auth-provider) under the hood. It returns the result of react-query's useQuery includes properties like `isSuccess` and `isError` with many others.

## Usage

It can be useful when you want to ask authentication for access [custom pages](/docs/guides-and-concepts/custom-pages) manually.

We have used this hook in refine's [`<Authenticated>`](#) component that allows only authenticated users can access to the page or any part of code.

We' ll demonstrate similar basic implementation like below. Imagine you have public page but want to make specific fields private.

- Create a wrapper component that renders children if `checkAuth` method returns Promise resolved.

```tsx title="components/authenticationChecker"
// highlight-next-line
import { useAuthenticated } from "@pankod/refine";

export const AuthenticationChecker: React.FC = ({
    children
}) => {
    // highlight-next-line
    const { isSuccess, isError } = useAuthenticated();

    if (isSuccess) {
        return <>{children}</>;
    }

    if (isError) {
        return null;
    }
};
```

<br />

- We have a logic in [`authProvider`](/docs/guides-and-concepts/providers/auth-provider)'s `checkAuth` method like below.

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


- Only authenticated users can see the price field.

```tsx title="components/postShow"
import { Typography, Show } from "@pankod/refine";

// highlight-next-line
import { AuthenticationChecker } from "/components/authenticationChecker"

const { Title, Text } = Typography;

export const PostShow: React.FC = () => (
    <Show>
        <Title>Status</Title>
        <Text>Approved</Text>
        //highlight-start
        <AuthenticationChecker>
            <Title>Price</Title>
            <Text>20</Text>
        </AuthenticationChecker>
        //highlight-end
    </Show>
)
```



:::caution
This hook can only be used if `authProvider` is provided.
:::
