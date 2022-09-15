---
"@pankod/refine-antd": minor
"@pankod/refine-ui-types": minor
---

Added `formProps` property support for AuthPage component

## Usage

```tsx
<AuthPage
    type="login"
    formProps={{
        initialValues: {
            email: "demo@refine.dev",
            password: "demo",
        },
    }}
/>
```