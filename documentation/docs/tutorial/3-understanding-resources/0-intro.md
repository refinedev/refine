---
id: index
title: Resources
tutorial:
    order: 0
    prev: false
    next: tutorial/adding-crud-pages/{preferredUI}/index
---

:::info Remember

<UIConditional is="antd">

In the [Unit 2.4](/docs/tutorial/getting-started/antd/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="chakra-ui">

In the [Unit 2.4](/docs/tutorial/getting-started/chakra-ui/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="headless">

In the [Unit 2.4](/docs/tutorial/getting-started/headless/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="mantine">

In the [Unit 2.4](/docs/tutorial/getting-started/mantine/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="mui">

In the [Unit 2.4](/docs/tutorial/getting-started/mui/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

:::

Before we start, let's understand what `<Refine>` component is.

The `<Refine>` is the initialization point of **refine**. It is a wrapper component that provides the context to the **refine** components and hooks. It is used to configure the highest level settings of the app.

In order to initialize the app, the `dataProvider` is the only required prop to be provided. Additionally, it also has other props such as `resources`, `routerProvider`, `authProvider`, `i18nProvider` etc. These props allow for the configuration of different aspects of the app, including data management, routing, authentication, localization, layout etc.

[Refer to the `<Refine>` documentation for more information &#8594](/docs/api-reference/core/components/refine-config/)

## What is resource?

In the context of a CRUD application, a resource typically refers to a data entity that can be created, read, updated, or deleted. For example, a resource could be a user account, a blog post, a product in an online store, or any other piece of data that can be managed by the CRUD app.

## Resources and Routes

Paths are used to hint refine to do things like rendering menu items, breadcrumbs and handling form redirections. It completely detached from the router logic. Routes should be handled by your framework (React Router, NextJS, Remix).

This flexibility allows refine to be used inside existing web applications independently, without limiting users. refine can be attached to routes where it's needed. Doesn't interfere with your routing logic. This means refine can be used with enterprise-grade applications with challenging requirements like nested routes, multi-tenancy etc.

With this approach allows for greater flexibility and scalability in the application, as new resources can be added or modified easily, without affecting the existing code.

## Defining Resource

To add a `resource` to our app, we need use `resources` prop of `<Refine>` component. This prop accepts an array of objects. Each object represents a resource. The resource object may contain properties to define the name of the resource, the routes of the actions it can perform which can be defined as paths and additional metadata such as the label, the icon, audit log settings, nesting etc.

Here's a simple example of how to add a resource to a **refine** app:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            //highlight-start
            resources={[
                {
                    name: "products",
                    list: "/products",
                    show: "/products/show/:id",
                    create: "/products/create",
                    edit: "/products/edit/:id",
                },
            ]}
            //highlight-end
        >
            {/* ... */}
        </Refine>
    );
};

export default App;
```

## Defining Actions for a Resource

A resource can perform actions such as `list`, `show`, `edit`, `create`, `delete` and `clone`. These actions except `delete`, are defined in the properties of the resource object.

### Using Paths

The simplest way to define the actions is to provide the path of the page. For example, if we want to define the `list` action of the `products` resource, we can do it as follows:

```tsx
{
    name: "products",
    list: "/products",
}
```

Paths are instructing **refine** to acknowledge the existence of the action for a resource at the specified path. This will allow **refine** to infer the resource by the current path without requiring the user to explicitly define the resource in its hooks and components.

Paths can include parameters with a convention similar `:paramName`. For example, if we want to define the `show` action of the `products` resource, we can do it as follows:

```tsx
{
    name: "products",
    show: "/products/show/:id",
}
```

Additional parameters can also be defined in the path. For example, if we want to define the `edit` action of the `products` resource, we can do it as follows:

```tsx
{
    name: "products",
    edit: "/products/edit/:id/:version",
}
```

These additional parameters except for the `id` parameter, can be passed to the components or hooks using `meta` properties. Also the existing parameters in the URL will be used by default when handling the navigation. So, let's say we have a `create` action for the `products` resource as `/:userId/products/create` and the user is currently on the `/:userId/products` page. When the user clicks on the `create` button, the user will be redirected to `/:userId/products/create` page. The `userId` parameter will be inferred from the current path unless it is explicitly defined in the `meta` property.

:::tip

Features related to routing such as the inference of the resource by the route, the generation of the routes (optional) and etc. require the use of the `routerProvider` prop of the `<Refine/>` component.

[Refer to the documentation for more information &#8594](/docs/api-reference/core/components/refine-config/#routerprovider)

When using the **refine** hooks and components, if you provide a `routerProvider` the `resource` will be inferred from the current route and the inferred resource will be passed as `resource` to `dataProvider` functions, hooks and components by default.

:::

## Learn More

Learn more about [resources](/docs/api-reference/core/components/refine-config/#resources) in the API reference.

<Checklist>

<ChecklistItem id="understanding-resource">
I understood what a resource is and how to add a resource to the app.
</ChecklistItem>

</Checklist>
