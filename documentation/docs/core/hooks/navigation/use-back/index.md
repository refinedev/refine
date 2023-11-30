---
title: useBack
sidebar_label: useBack
---

`useBack` is a hook that leverages the `back` method of the [`routerProvider`][routerprovider] to perform the "go back" operation in the history stack.

## Basic Usage

```tsx
import { useBack } from "@refinedev/core";

const MyComponent = () => {
  const back = useBack();

  return <Button onClick={() => back()}>Go Back</Button>;
};
```

[routerprovider]: /docs/core/providers/router-provider
