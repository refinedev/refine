---
"@refinedev/mui": minor
---

feat: add new `<LoadingOvertimeIndicator>` component

The `<LoadingOvertimeIndicator>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

`@refinedev/mui` provides a default `overtimeComponents` that you can use. it will display a loading indicator after 3 seconds and a different loading indicator after 5 seconds. You can customize it by passing your own `overtimeComponents`.

It is used like this:

```tsx
import {  useOne } from "@refinedev/core";
import { LoadingOvertimeIndicator, overtimeComponents } from "@refinedev/mui";


const MyPage = () => {
    const { data, isFetching } = useOne({...});

    return (
        <LoadingOvertimeIndicator
            overtimeComponents={overtimeComponents}
            isLoading={isFetching ?? true}
            interval={1000}
        >
            <YourComponent />
        </LoadingOvertimeIndicator>
    );
};
```

or like this:

```tsx
import {  useOne } from "@refinedev/core";
import { LoadingOvertimeIndicator, overtimeComponents } from "@refinedev/mui";

const MyPage = () => {
    const {
        data,
        overtime: { elapsedTime },
    } = useOne({...});

    return (
        <LoadingOvertimeIndicator
            overtimeComponents={overtimeComponents}
            elapsedTime={elapsedTime ?? 0}
        >
            <YourComponent />
        </LoadingOvertimeIndicator>
    );
};
```

You can also use `swizzle` to customize it.

