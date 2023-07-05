---
id: chakra-ui-auto-save-indicator
title: <AutoSaveIndicator>
sidebar_label: <AutoSaveIndicator>
description: <AutoSaveIndicator> component shows `autosave` status on edit actions.
source: packages/chakra-ui/src/components/autoSaveIndicator/index.tsx
---

`<AutoSaveIndicator>` component from **refine** for **Chakra UI** contains logic for showing `autosave` feature. 

Simple usage is as follows:

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/chakra-ui";

const MyComponent = () => {
    const { refineCore: { autoSaveProps } } = useForm({
        refineCoreProps: {
            autoSave: true,
        }
    });

    return (
        <AutoSaveIndicator {...autoSaveProps}/>
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/AutoSaveIndicator" />
