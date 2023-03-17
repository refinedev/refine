---
id: can-access
title: <CanAccess>
siderbar_label: <CanAccess>
source: packages/core/src/components/canAccess/index.tsx
---

`<CanAccess>` is the component form of [`useCan`][use-can].

It internally uses [`useCan`][use-can]'s return values to provide its functionality.

Passes the given properties to the `can` method from your [access control provider][access-control-provider]. After, if it returns:

-   `true`, it renders the children.
-   `false`, it renders [`fallback`](#fallback) prop if provided. Otherwise, it renders `null`.

[Refer to Access Control Provider for more information. &#8594][access-control-provider]

## Basic Usage

By default, `CanAccess` component will infer current resource and action based on your route automatically.

So if you are at `/posts` route, `CanAccess` will check authorization for `posts` resource and `list` action.

For `/posts/show/:id` route, action will be `show`.

```tsx
import { CanAccess } from "@refinedev/core";

const MyComponent = () => (
    <CanAccess fallback={<CustomFallback />}>
        <YourComponent />
    </CanAccess>
);
```

### Usage with props

You may have a case like in the `/posts/show/:id` page, where inferred resource is `posts` and action is `show`, but you want to authorize a different resource eg. `category`.

In this case, you can explicitly pass props to `CanAccess` component for authorizing a different resource.

```tsx
import { CanAccess } from "@refinedev/core";

const MyComponent = () => (
    <Show>
        <Title>Id</Title>
        <Text>{record?.id}</Text>
        <Title level={5}>Title</Title>
        <Text>{record?.title}</Text>
        // highlight-start
        <CanAccess resource="categories" action="show">
            <Title level={5}>Category</Title>
        </CanAccess>
        // highlight-end
    </Show>
);
```

## Properties

It's also accepts all the properties of [`useCan`](/docs/api-reference/core/hooks/accessControl/useCan/#properties).

### `fallback`

Component to render if [`useCan`][use-can] returns false. If `undefined`, it renders `null`.

```tsx
<CanAccess fallback={<div>You cannot access this section</div>}>
    <YourComponent />
</CanAccess>
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/CanAccess"/>

[use-can]: /docs/api-reference/core/hooks/accessControl/useCan/
[access-control-provider]: /docs/api-reference/core/providers/accessControl-provider/
[can]: /docs/api-reference/core/hooks/accessControl/useCan/#can
