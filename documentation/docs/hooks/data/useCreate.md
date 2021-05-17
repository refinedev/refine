---
id: useCreate
title: useCreate
siderbar_label: useCreate
---

`useCreate` is a modified version of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation#) for create mutations. It uses `create` method from the `dataProvider` that is passed to `<Admin>`.  

### Features

* Shows notifications on success and error.  

* Automatically invalidates `list` queries after mutation is succesfully run.  
[Refer to React Query docs for detailed information &#8594](https://react-query.tanstack.com/guides/invalidations-from-mutations)

### Usage

```ts
const mutationResult = useCreate<RecordType>();
const { mutate, isLoading } = mutationResult;

mutate({
    resource: "your-resource",
    values: {
        "your-key": 123,
    },
    {
        onSuccess: (data, ...rest) => {
          ...  
        },
        onError: (error, ...rest) => {
          ...  
        }
    }
})
```

`mutationResult` is what's returned from `react-query`'s `useMutation`.

You may produce a custom `RecordType` that represents a record in a resource. It will be used for response data.

```ts title="mutation response:"
{ data: RecordType; }
```

:::important
Variables passed to `mutate` must have the type of

```ts
{
    resource: string;
    values: BaseRecord;
}
```
```ts
type BaseRecord = {
    id?: string | number;
    [key: string]: any;
};
```
:::
### Return values

| Property       | Description            | Type                                                                                                          |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| mutationResult | Result of the mutation | [`UseMutationResult<`<br/>`{ data: RecordType},`<br/>`unknown,`<br/>`  { resource: string; values: BaseRecord; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |

