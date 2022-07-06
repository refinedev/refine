---
"@pankod/refine-core": minor
---

`useLog` is converted to useQuery mutation.

```
// before
const { log } = useLog();
log({
  resource: 'posts',
  action: 'create',
  data: {
      id: 1
  }
});
```

```
// after
const { log } = useLog();
const { mutation } = log;
mutation({
  resource: 'posts',
  action: 'create',
  data: {
      id: 1
  }
});
```

