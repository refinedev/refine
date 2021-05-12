---
id: useCreate
title: useCreate
siderbar_label: useCreate
---

`useCreate` is an enhanced version of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation#) for create mutations. It uses `create` from the `dataProvider` that is passed to `<Admin>`.  

* Shows notifications on success and error.  

* Automatically invalidates `list` queries after mutation is succesfully run.  
[Refer to React Query docs for detailed information &#8594](https://react-query.tanstack.com/guides/invalidations-from-mutations)

### Usage

```ts
const mutationResult = useCreate<MutationType>();
const { mutate, isLoading } = mutationResult;
```

`mutationResult` is what's returned from `react-query`'s `useMutation`.