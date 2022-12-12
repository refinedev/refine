---
id: inferencer
title: Inferencer
---

`@pankod/refine-inferencer` is a package that provides a way to automatically generate views for resources based on the data structure. The aim is to reduce the amount of time spent on creating views for resources by generating the code automatically that can be customized easily. 

The package exports components for **List**, **Show**, **Create** and **Edit** views inside UI package scopes. For example, `@pankod/refine-inferencer/antd` exports components for `@pankod/refine-antd` package.

## Installation

<Tabs
defaultValue="npm"
values={[
{label: 'use npm', value: 'npm'},
{label: 'use yarn', value: 'yarn'}
]}>
<TabItem value="npm">

```bash
npm i @pankod/refine-inferencer
```

  </TabItem>
    <TabItem value="yarn">

```bash
yarn add @pankod/refine-inferencer
```

  </TabItem>
</Tabs>

## Available UI Inferencers

- [Ant Design](/docs/api-reference/antd/components/inferencer)
- [Material UI](/docs/api-reference/mui/components/inferencer)
- [Mantine](/docs/api-reference/mantine/components/inferencer)
- [Chakra UI](/docs/api-reference/chakra-ui/components/inferencer)

:::info
`@pankod/refine-inferencer` is an experimental package and it is now in the early stages of development. We are working on improving the package and adding new features.

If you have any suggestions or feedback, please let us know in the [**GitHub Discussions**](https://github.com/refinedev/refine/discussions/3046)
:::

:::caution Warning
`@pankod/refine-inferencer` components are meant to be used in development environments. They are not meant to be used in production environments.
:::

## How it works?

Simply, `@pankod/refine-inferencer` generates views and codes based on the data structure of the resource by fetching it using the `dataProvider` of `<Refine/>` component.

For, `edit` and `show` actions, we send the request with `resource` and `id`. For `list` and `create` actions, we send a list request with `resource` and use one of the items to generate the view.

While inferring the field types, we use a set of functions that each checks the field for a specific type and returns the inferred type. These functions also can return a `priority` field that is used to determine the type of the field. For example, if we have a `created_at` property with a string value, we can infer it as a `date` type and a `text` type. In this case, we use the `priority` field to determine the type of the field. The higher the priority, the more accurate the type of the field.

Properties with multiple values are identified as `array` type but also repeats the same process for their values to determine the type of the values. Same also happens for `object` type properties. Both can have `accessor` field in return value to access the values of the property which is used when creating the view and the code.

If the property is an `object` type, we try to pick a key to represent that property. For example, if we have a `category` field with `{ label: string; id: string; }` type, we pick `label` as the key to represent the property. These `object` fields with keys to represent them have the property `fieldable` set to `true` in the return value.

:::note List of keys that can be used to represent an `object` type property
```
"name" | "label" | "title" | "count" | "content" | "username" | "nickname" | "login" | "firstName" | "lastName" | "url"
```
:::

For determine the relations we use multiple steps, first one is the `relation` field function that checks the name of the property. It will return as `type: relation` if the property name is `id` or ends with `_id|_ids|_ID|_IDS|_id[]|Id[]..`.

:::note
Properties with `object` types with only `id` property are also considered as `relation` type.
:::

:::tip Available field types and functions
```
"relation" | "array" | "object" | "date" | "email" | "image" | "url" | "richtext" | "text" | "number" | "boolean" | "unknown" | "custom_{string}"
```
:::

:::note
`custom_${string}` is used by the inferencer components of UI packages when they have custom representations, for now users can't pass custom types and functions to the inferencer components.
:::

Like the `relation` field function, we don't do all the checks in a single function and keep the field function set as simple as possible. As a second step, we use transformer functions to do some extra checks and return modified inferred types for the fields. For example, if we have a `avatar` field which might be inferred as `url` type, it will be transformed to `image` type based on its property name. 

We also have transformers for `relation` type fields. One checks for the `resources` of `<Refine />` to match the resource name of the relation. Another one checks for the type of the property and if its a basic field like `string` or `number` it will be marked as `can-be-relation` to be checked with the `dataProvider` later. For `relation` type fields in `object` form, if we can't find a `resource` to handle the relation, we convert the field to a `fieldable` and check the keys of the object to find a representation key for the field.

:::info **Checking relations from the API**

For the last step of the `relation` type determination, we send `getOne` requests with field key in both plural and singular forms to try and find a resource to handle the relation. If we find a resource, we keep the `relation` type mark in the field, otherwise `relation` will be set to `false` and the field will be converted to a `fieldable`.

:::

After the `relation` fields are settled. We apply a simplified inference process to determine the type of the relation resource response.

:::tip rendering
To render the components we use a fork of `react-live`[#] package with Typescript support.
:::

After the fields are determined, we use the `renderer` functions to create the code for the components and also use the same code to render the components in the view. `renderer` functions are constructed per action type and the UI package. This means, `@pankod/refine-inferencer/antd` and other UI scopes has different `renderer` functions for `list`, `show`, `edit` and `create` actions. 

`renderer` function returns a `string` that includes the code for the component which is presented to user to copy and paste to their project. The same code is also used to render the component in the view.

:::note
Component name is determined by the active `resource` element and the active action. If the resource has `option.label` field, it will be used as the part of the component name. Otherwise, the `resource.name` will be used. For example, if the resource name is `categories` and the action is `list`, the component name will be `CategoryList`.
:::

:::tip `fieldTransformer` prop in Inferencer components

If you want to customize the output of the Inferencer such as setting a custom `accessor` property for `object` type fields or changing the `type` of a field, or changing the `resource` for a `relation` type, you can use`fieldTransformer` prop in Inferencer components. It is a function that takes the field as an argument and returns the modified field. If `undefined | false | null` is returned, the field will be removed from the output, both for the preview and the code.

:::