---
"@refinedev/chakra-ui": minor
"@refinedev/mantine": minor
"@refinedev/antd": minor
"@refinedev/core": minor
"@refinedev/mui": minor
---

feat: added new prop called `mutationVariables` to `<AuthPage />`. #6431
From now on, you can pass additional parameters to the `authProvider` methods using the `mutationVariables` prop of the `<AuthPage />` component.

```tsx
import { AuthPage } from "@refinedev/antd"; // or "@refinedev/chakra-ui", "@refinedev/mantine", "@refinedev/mui"

const MyLoginPage = () => {
  return (
    <AuthPage
      type="login" // all other types are also supported.
      // highlight-start
      mutationVariables={{
        foo: "bar",
        xyz: "abc",
      }}
      // highlight-end
    />
  );
};

// all mutation methods are supported.
const authProvider = {
  login: async ({ foo, xyz, ...otherProps }) => {
    console.log(foo); // bar
    console.log(xyz); // abc
    // ...
  },
  register: async ({ foo, xyz, ...otherProps }) => {
    console.log(foo); // bar
    console.log(xyz); // abc
    // ...
  },
  // ...
};
```

[Resolves #6431](https://github.com/refinedev/refine/issues/6431)
