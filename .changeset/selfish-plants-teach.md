---
"@pankod/refine-cloud": minor
---
Added `useCloudQuery` and `useCloudMutation` for refine cloud queries.

**Usage**

```
import { useCloudQuery, useCloudMutation } from "@pankod/refine-cloud";

const { data } = useCloudQuery({
  key: 'postgres-list-user',
  config: {},
  customParams: {
    name: 'John Doe',
  },
});

const { mutation } = useCloudMutation();

mutation({
  key: 'postgres-create-user',
  config: {},
  customParams: {
    name: 'John Doe',
    email: 'johndoe@mail.com',
  },
})
```
