---
id: strapi-v4
title: Strapi-v4
---

**refine** supports the features that come with [Strapi-v4](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

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


:::note
You can handle features such as Sorting, Pagination and Filters with Dataprovider. There is no need to use MetaDataQuery.
:::

## Fields Selection
To select only some fields, we must specify this fields with metadata.

[Refer to the Fields Selection documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#fields-selection)

```tsx title="Get only id and title of all posts"
    metaData: {
        fields: ["id", "title"]
    },
```

```tsx title="Get all fields of all posts(id, title, category, content ...)"
    metaData: {
        fields: "*"
    },
```

## Releations Population
By default, relations are not populated when fetching entries.

The `populate` parameter is used to define which fields will be populated.

[Refer to the Releations Population documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#relations-population)

```tsx title="Get all the posts and populate the selected relations"
    metaData: {
        populate: ["category", "cover"]
    },
```

```tsx title="Get all posts and populate all their first-level relations"
    metaData: {
        populate: "*"
    },
```

## Publication State

:::note
The Draft & Publish feature should be enabled on Strapi.
:::

[Refer to the Publication State documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#publication-state)

`live`: returns only published entries

`preview`: returns draft and published entries

```tsx
    metaData: {
        publicationState: "preview"
    },
```

## Locale
:::tip
To fetch content for a locale, make sure it has been already [added to Strapi in the admin panel](https://docs.strapi.io/user-docs/latest/settings/managing-global-settings.html#configuring-internationalization-locales)
:::

[Refer to the Locale documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#locale)

```tsx
    metaData: {
        locale: "de"
    },
```


## Live Codesandbox Example