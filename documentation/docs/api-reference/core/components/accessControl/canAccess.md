---
id: can-access
title: <CanAccess>
siderbar_label: <CanAccess>
---

`<CanAccess />` is a wrapper component that uses `useCan` to check for access control. It takes the parameters that `can` method takes and also a `fallback`. It renders its children if the access control returns true and if access control returns false renders `fallback` if provided.

```tsx
import { CanAccess } from "@pankod/refine-core";
<CanAccess
    resource="posts"
    action="edit"
    params={{ id: 1 }}
    fallback={<CustomFallback />}
>
    <YourComponent />
</CanAccess>
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/CanAccess"/>
