---
id: useApiUrl
title: useApiUrl
---

`useApiUrl` lets you access the API URL of the `dataProvider` that was configured in [`<Refine>`][Refine] component.

```ts
const url = useApiUrl();
```

Here in this case, `url` is the API URL of the data provider.

This hook uses the `getApiUrl` method of the used [data provider][Data Provider].

[Refine]: /api-references/components/refine-config.md
[Data Provider]: /api-references/providers/data-provider.md