---
"@refinedev/chakra-ui": minor
---

feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/chakra-ui/components/basic-views/edit/#autosaveprops). 
[useForm](https://refine.dev/docs/packages/documentation/react-hook-form/useForm/#autosave), [useDrawerForm](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/#autosave), [useModalForm](https://refine.dev/docs/packages/documentation/react-hook-form/useModalForm/#autosave), [useStepsForm](https://refine.dev/docs/packages/documentation/react-hook-form/useStepsForm/#autosave) hooks now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.

```
const { autoSaveProps } = useForm({
    refineCoreProps: {
        autoSave: {
            enabled: true,
            debounce: 2000, // not required, default is 1000
        },
    }
});

return (
    <Edit 
        saveButtonProps={saveButtonProps} 
        // pass autoSaveProps to Edit component
        autoSaveProps={autoSaveProps}
    >
        // form fields
    </Edit>
);
```

feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

```
import { AutoSaveIndicator } from "@refinedev/chakra-ui";
const { autoSaveProps } = useForm({
    refineCoreProps: {
        autoSave: {
            enabled: true,
            debounce: 2000, // not required, default is 1000
        },
    }
});

return (
    <div>
        <AutoSaveIndicator {...autoSaveProps}>
    </div>
);
```