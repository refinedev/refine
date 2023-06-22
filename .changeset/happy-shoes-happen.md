---
"@refinedev/core": minor
---

feat: add new `<LoadingOvertime>` component

The `<LoadingOvertime>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

It is used like this:

```tsx
import { LoadingOvertime, useOne } from "@refinedev/core";

const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

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
import { LoadingOvertime, useOne } from "@refinedev/core";

const overtimeComponents = {
    3000: <div>It's taking a bit longer than expected.</div>,
    5000: <div>This is taking longer than expected, please hang on.</div>,
};

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
