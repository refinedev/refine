---
"@refinedev/core": minor
---

feat: `autoSave` feature for [useForm](https://refine.dev/docs/api-reference/core/hooks/useForm/#autosave) hook now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.
`autoSaveProps` is an object that contains `data`, `error` and `status` values. `data` is the saved data, `error` is the error object and `status` is the status of the request. `status` can be `loading`, `error`, `idle` and `success`.

```
const { autoSaveProps } = useForm({
    autoSave: {
        enabled: true,
        debounce: 2000, // not required, default is 1000
    },
});
```