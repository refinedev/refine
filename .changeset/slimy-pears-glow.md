---
"@refinedev/chakra-ui": minor
---

feat: add new `<LoadingOvertime>` component

The `<LoadingOvertime>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

`@refinedev/chakra-ui` provides a default `overtimeComponents` that you can use. it will display a loading indicator after 3 seconds and a different loading indicator after 5 seconds. You can customize it by passing your own `overtimeComponents`.

It is used like this:

```tsx
import {  useOne } from "@refinedev/core";
import { LoadingOvertime, overtimeComponents } from "@refinedev/chakra-ui";


const MyPage = () => {
    const { data, isLoading } = useOne({...});

    return (
        <LoadingOvertime
            overtimeComponents={overtimeComponents}
            isLoading={isLoading}
            interval={1000}
        >
            <YourComponent />
        </LoadingOvertime>
    );
};
```

or like this:

```tsx
import {  useOne } from "@refinedev/core";
import { LoadingOvertime, overtimeComponents } from "@refinedev/chakra-ui";

const MyPage = () => {
    const {
        data,
        overtime: { elapsedTime },
    } = useOne({...});

    return (
        <LoadingOvertime
            overtimeComponents={overtimeComponents}
            elapsedTime={elapsedTime}
        >
            <YourComponent />
        </LoadingOvertime>
    );
};
```

You can also use `swizzle` to customize it.
