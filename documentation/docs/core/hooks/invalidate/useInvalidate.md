---
id: useInvalidate
title: useInvalidate
---

`useInvalidate` can be used to invalidate the state of a particular `resource` or `dataProvider` (with dataProviderName). 

For example, creating a `Posts` with [useCreate](/core/hooks/data/useCreate.md) hook will invalidate the `list` ([useList](/core/hooks/data/useList.md)) and `many` ([useMany](/core/hooks/data/useMany.md)) state of the `Posts` resource.

The hook is used internal in **refine**. Normally you don't need this hook, but we export it as it may be useful for some use-cases.

```ts
import { useInvalidate } from "@pankod/refine-core";

const invalidate = useInvalidate();

// To invalidate the list and many states of the Posts resource
invalidate({
    resource: "posts",
    invalidates: ["list", "many"]
});

// To invalidate the state of a Posts with an id of 1
invalidate({
    resource: "posts",
    invalidates: ["detail"],
    id: 1,
});

// To invalidate the list and many states of the Posts resource of the dataProvider named "second-data-provider"
invalidate({
    resource: "posts",
    dataProviderName: "second-data-provider",
    invalidates: ["list"],
});

// To invalidate all states of dataprovider named "second-data-provider"
invalidate({
    dataProviderName: "second-data-provider",
    invalidates: ["all"],
});
```

## API Reference

### Properties

| Property         | Description                                                                                        | Type                                                    | Default   |
| ---------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------- |
| <div className="required-block"><div>invalidates</div> <div className="required">Required</div></div>      | The states you want to invalidate.                                                                  | `all`, `resourceAll`, `list`, `many`, `detail`, `false` |           |
| resource         | Resource name for State invalidation.                                                               | `string`                                                |           |
| id               | The `id` to use when invalidating the "detail" state.                                               | [`BaseKey`](/core/interfaces.md#basekey)                |           |
| dataProviderName | The name of the data provider whose state you want to invalidate. | `string`                                                | `default` |
