---
id: antd-auto-save-indicator
title: <AutoSaveIndicator>
sidebar_label: <AutoSaveIndicator>
description: <AutoSaveIndicator> component shows `autoSave` status on edit actions.
source: packages/antd/src/components/autoSaveIndicator/index.tsx
---

`<AutoSaveIndicator>` component from **refine** for **Ant Design** can be used to communicate auto-save status to the user. 

Simple usage is as follows:

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/antd";

const MyComponent = () => {
    const { autoSaveProps } = useForm({
        autoSave: {
            enabled: true,
        },
    });

    return (
        <AutoSaveIndicator {...autoSaveProps}/>
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/AutoSaveIndicator" />
