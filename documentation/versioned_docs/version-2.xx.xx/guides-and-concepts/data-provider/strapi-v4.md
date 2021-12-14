---
id: strapi-v4
title: Strapi-v4
---

**refine** supports the features that come with strapi-v4.

A few of the Strapi-v4 API features are as follows:

-   Fields Selection
-   Releations Population
-   Publication State
-   Locale

Thanks to `MetaDataQuery`, you can send queries that come with these features we mentioned in a simple way.

Hooks and components that support `MetaDataQuery`:

| Supported data hooks                                                 | Supported other hooks                                                       | Supported components                                                   |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`useUpdate` &#8594](api-references/hooks/data/useUpdate.md)         | [`useForm` &#8594](api-references/hooks/form/useForm.md)                    | [`DeleteButton` &#8594](api-references/components/buttons/delete.md)   |
| [`useUpdateMany` &#8594](api-references/hooks/data/useUpdateMany.md) | [`useModalForm` &#8594](api-references/hooks/form/useModalForm.md)          | [`RefreshButton` &#8594](api-references/components/buttons/refresh.md) |
| [`useDelete` &#8594](api-references/hooks/data/useDelete.md)         | [`useDrawerForm` &#8594](api-references/hooks/form/useDrawerForm.md)        |                                                                        |
| [`useDeleteMany` &#8594](api-references/hooks/data/useDeleteMany.md) | [`useStepsForm` &#8594](api-references/hooks/form/useStepsForm.md)          |                                                                        |
| [`useCreate` &#8594](api-references/hooks/data/useCreate.md)         | [`useTable` &#8594](api-references/hooks/table/useTable.md)                 |                                                                        |
| [`useCreateMany` &#8594](api-references/hooks/data/useCreateMany.md) | [`useEditableTable` &#8594](api-references/hooks/table/useEditableTable.md) |                                                                        |
| [`useList` &#8594](api-references/hooks/data/useList.md)             | [`useSimpleList` &#8594](api-references/hooks/show/useSimpleList.md)        |                                                                        |
| [`useOne` &#8594](api-references/hooks/data/useOne.md)               | [`useShow` &#8594](api-references/hooks/show/useShow.md)                    |                                                                        |
| [`useMany` &#8594](api-references/hooks/data/useMany.md)             | [`useExport` &#8594](api-references/hooks/import-export/useExport.md)       |                                                                        |
| [`useCustom` &#8594](api-references/hooks/data/useCustom.md)         | [`useCheckboxGroup` &#8594](api-references/hooks/field/useCheckboxGroup.md) |                                                                        |
|                                                                      | [`useSelect` &#8594](api-references/hooks/field/useSelect.md)               |                                                                        |
|                                                                      | [`useRadioGroup` &#8594](api-references/hooks/field/useRadioGroup.md)       |                                                                        |
