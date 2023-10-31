---
"@refinedev/mantine": patch
---

Now `useSelect` hook accepts 4th generic type `TOption` which allows you to change the type of options. By default `TOption` will be equal to `DefaultOption` type which is `{ label: string; value: any; }`. If you want to change the type of options, you can do it like this:

In PR #5160 the type convertion of the options are tried to be resolved by string conversion. This is not correct due to the fact that the `value` property of the option can be of any type. This was breaking the connection between the forms and the select inputs.

This change is reverted in the `@refinedev/core`, now changed the types and the logic to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook.

Mantine's `<Select />` component only allows values to be `string`. In a case of a `value` not being `string`, you'll be able to manipulate the options via mapping the options before using them.

Here's how to get the proper types for the options and fix the value type issue:

```tsx
import { HttpError } from "@refinedev/core";
import { useSelect } from "@refinedev/mantine";
import { Select } from "@mantine/core";

type IPost = {
    id: number;
    title: string;
    description: string;
};

type IOption = { value: IPost["id"]; label: IPost["title"] };

const MyComponent = () => {
    const { selectProps } = useSelect<IPost, HttpError, IPost, IOption>({
        resource: "posts",
    });

    // This will result in `selectProps.data` to be of type `IOption[]`.
    // <Select /> will not accept `value` as `number` so you'll have to map the options.

    return (
        <Select
            {...selectProps}
            data={selectProps.data.map((option) => ({
                ...option,
                value: option.value.toString(),
            }))}
        />
    );
};
```
