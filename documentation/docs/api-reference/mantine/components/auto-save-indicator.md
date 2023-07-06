---
id: mantine-auto-save-indicator
title: <AutoSaveIndicator>
sidebar_label: <AutoSaveIndicator>
description: <AutoSaveIndicator> component shows `autoSave` status on edit actions.
source: packages/antd/src/components/autoSaveIndicator/index.tsx
---

`<AutoSaveIndicator>` component from **refine** for **Mantine** can be used to communicate auto-save status to the user. 

Simple usage is as follows:

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/mantine";

const MyComponent = () => {
    const { refineCore: { autoSaveProps } } = useForm({
        refineCoreProps: {
            autoSave: {
                enabled: true,
            },
        }
    });

    return (
        <AutoSaveIndicator {...autoSaveProps}/>
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/AutoSaveIndicator" />
