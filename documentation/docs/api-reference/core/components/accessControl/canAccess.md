---
id: can-access
title: <CanAccess>
siderbar_label: <CanAccess>
---

`<CanAccess>` is the component form of [`useCan`][use-can].

It internally uses [`useCan`][use-can]'s return values to provide its functionality.

When access control returns:

-   `true`, it renders the children.
-   `false`, it renders [`fallback`](#fallback) prop if provided. Otherwise, it renders `null` page.

[Refer to Access Control Provider for more information. &#8594][access-control-provider]

## Basic Usage

```tsx
import { CanAccess } from "@pankod/refine-core";

const MyComponent = () => (
  <CanAccess
    resource="posts"
    action="edit"
    params={{ id: 1 }}
    fallback={<CustomFallback />}
>
    <YourComponent />
</CanAccess>;
);
```

## Properties

It's also accepts all the properties of [`useCan`](/docs/api-reference/core/hooks/accessControl/useCan/#properties).

### `fallback`

Component to render if the user is not logged in. If `undefined`, the page will be redirected to `/login`.

```tsx
<Authenticated fallback={<div>You cannot access this section</div>}>
    <YourComponent />
</Authenticated>
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/CanAccess"/>

[use-can]: /docs/api-reference/core/hooks/accessControl/useCan/
[access-control-provider]: /docs/api-reference/core/providers/accessControl-provider/
