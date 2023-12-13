---
title: <AutoSaveIndicator />
description: <AutoSaveIndicator> component shows `autoSave` status on edit actions.
source: packages/chakra-ui/src/components/autoSaveIndicator/index.tsx
---

`<AutoSaveIndicator>` component from **refine** for **Chakra UI** can be used to communicate auto-save status to the user.

## Usage

Simple usage is as follows:

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/chakra-ui";

const MyComponent = () => {
  const {
    refineCore: { autoSaveProps },
  } = useForm({
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
  });

  return <AutoSaveIndicator {...autoSaveProps} />;
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/AutoSaveIndicator" />
