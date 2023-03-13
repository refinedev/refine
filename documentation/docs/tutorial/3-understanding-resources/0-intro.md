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

The `<Refine>` component serves as the starting point for **refine**. It is a wrapper component that offers context to the **refine** components and hooks. It is utilized to configure the top-level settings of the application.

To initialize the app, the dataProvider is the only necessary prop that must be provided. Additionally, there are other props such as `resources`, `routerProvider`, `authProvider`, `i18nProvider`, etc.

These props enable the configuration of various aspects of the application, such as data management, routing, authentication, localization, layout, and more.

[Refer to the `<Refine>` documentation for more information &#8594](/docs/api-reference/core/components/refine-config/)

## What is resource?

In the context of a CRUD application, a resource typically refers to a data entity that can be created, read, updated, or deleted. For example, a resource could be a user account, a blog post, a product in an online store, or any other piece of data that can be managed by the CRUD app.

To add a `resource` to our app, we need use `resources` prop of `<Refine>` component. This prop accepts an array of objects. Each object represents a resource. The resource object may contain properties to define the name of the resource, the routes of the actions it can perform which can be defined as paths, components or both and additional metadata such as the label, the icon, audit log settings, nesting etc.

## Note on resources and routes

Path definitions in the resource configuration helps **refine** to recognize the available actions for the resource at that particular path. This way, **refine** can automatically identify the resource based on the current path, without requiring users to manually specify the resource prop in their hooks and components.

The paths we define in resources helps **refine** to render menu items, breadcrumbs, and handle form redirections, among other things.

However, it's important to note that **route management should be handled by your preferred framework**, not by **refine**. This makes it possible to use **refine** with any web application, without any constraints.

Thanks to its flexibility, **refine** can be seamlessly integrated into existing web applications without imposing any limitations on users. It can be attached to routes where needed without interfering with your routing logic. This makes it possible to use **refine** with enterprise-grade applications that have challenging requirements such as nested routes and multi-tenancy.

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

The simplest way to define the actions is to provide the path of the page. For example, if we want to define the `list` action of the `products` resource, we can do it as follows:

```tsx
{
    name: "products",
    list: "/products",
}
```

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

## Learn More

Learn more about [resources](/docs/api-reference/core/components/refine-config/#resources) in the API reference.

<Checklist>

<ChecklistItem id="understanding-resource">
I understood what a resource is and how to add a resource to the app.
</ChecklistItem>

</Checklist>
