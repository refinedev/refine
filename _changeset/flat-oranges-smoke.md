---
"@refinedev/antd": patch
---

Now `useSelect`, `useRadioGroup` and `useCheckboxGroup` hooks accept 4th generic type `TOption` which allows you to change the type of options. By default `TOption` will be equal to `BaseOption` type which is `{ label: any; value: any; }`. If you want to change the type of options, you can do it like this:

```tsx
import { useSelect } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

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
