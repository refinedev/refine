---
id: index
title: Resources
tutorial:
    order: 0
    prev: false
    next: tutorial/adding-crud-pages/{preferredUI}/index
---

:::info Remember

In the [Unit 3.2](#), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine />` component using the mock components.

:::

`resources` are the main building block of **refine** app. Each resource allows you to create new routes of CRUD pages in your app.

Let's see what's going on under the hood when we add a `resources` to our app and learn `resources` term for who are new to **refine**.

To add `resource` to our app, we must use `resources` prop of `<Refine />` component. This prop accepts an array of objects. Each object represents a resource.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            //highlight-start
            resources={[
                {
                    name: "posts",
                    list: () => <div>Posts List Page</div>,
                    show: <div>Post Detail Page</div>,
                    create: <div>Post Create Page</div>,
                    edit: <div>Post Edit Page</div>,
                },
            ]}
            //highlight-end
        />
    );
};

export default App;
```

In the above example, we have added a `resource` with name `posts`. This resource has 5 pages. `list`, `show`, `create`, `clone` and `edit` pages and **refine** link the pages with routes for us. We can access these pages by visiting the following routes:

-   `/posts` - Post List Page
-   `/posts/show/:id` - Post Detail Page
-   `/posts/create` - Post Create Page
-   `/posts/clone/:id` - Post Clone Page
-   `/posts/edit/:id` - Post Edit Page

:::tip

When using the **refine** hooks and components in the created pages, the `name` property of the `resource` will be passed to the `dataProvider` functions, by default.

:::

## Learn More

Learn more about [resources](/docs/api-reference/core/components/refine-config/#resources) in the API reference.

<!-- > Burada Mini Quiz yapabilir
> refine da resource kavramı ile ilgili sorular

**_Checklist for moving on_**

-   [x] resources kavramını anladım --> -->
