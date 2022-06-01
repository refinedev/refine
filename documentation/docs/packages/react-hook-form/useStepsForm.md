---
id: useStepsForm
title: useStepsForm
---

`useStepsForm` allows you to manage a form with multiple steps. It provides features such as which step is currently active, the ability to go to a specific step and validation when changing steps etc.

:::info
`useStepsForm` hook is extended from [`useForm`][react-hook-form-use-form] from the [`@pankod/refine-react-hook-form`][@pankod/refine-react-hook-form] package.
:::

## Properties

### `stepsProps`

**`defaultStep`**: It allows you to set the initial step. By default it is `0`.

```tsx
const stepsFormReturnValues = useStepsForm({
    stepsProps: {
        defaultStep: 1,
    },
});
```

**`isBackValidate`**: Should the validation be done when going back to a previous step?. By default it is `false`.

```tsx
const stepsFormReturnValues = useStepsForm({
    stepsProps: {
        isBackValidate: true,
    },
});
```

### `refineCoreProps`

### Other props

[@pankod/refine-react-hook-form]: https://github.com/pankod/refine/tree/master/packages/react-hook-form
[react-hook-form-use-form]: /docs/packages/react-hook-form/useForm.md
