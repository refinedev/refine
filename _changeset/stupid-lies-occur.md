---
"@refinedev/core": minor
---

feat: added `onUnauthorized` callback to `<CanAccess />` component. This callback to be called when [`useCan`](https://refine.dev/docs/api-reference/core/hooks/accessControl/useCan/) returns false.

```tsx
<CanAccess
    onUnauthorized={({ resource, reason, action, params }) =>
        console.log(
            `You cannot access ${resource}-${params.id} resource with ${action} action because ${reason}`,
        )
    }
>
    <YourComponent />
</CanAccess>
```
