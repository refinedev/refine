---
"@refinedev/core": patch
---

Reverted the faulty assumption on option values of `useSelect` hook to be of type `string`. Now changed the types and the logic to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook. (Reverted PR #5160)

By default `TOption` will be equal to `BaseOption` type which is `{ label: any; value: any; }`. If you want to change the type of options, you can do it like this:

```tsx
import { useSelect, HttpError } from "@refinedev/core";

type MyData = {
    id: number;
    title: string;
    description: string;
    category: { id: string };
};

type Option = { label: MyData["title"]; value: MyData["id"] }; // equals to { label: string; value: number; }

useSelect<MyData, HttpError, MyData, Option>({
    resource: "posts",
});
```
