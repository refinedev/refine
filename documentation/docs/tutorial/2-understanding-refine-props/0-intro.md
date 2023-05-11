---
id: index
title: 3.1. Understanding <Refine /> Props
tutorial:
    prev: tutorial/getting-started/inferencer-for-crud-pages
    next: tutorial/understanding-refine-props/data-provider
---


This unit explains the two fundamental concepts in **refine**: data providers representing the `dataProvider` prop of `<Refine />` and the array of resource objects defined for the `resources` prop.

## Understanding `<Refine />` Props

As we mentioned earlier, almost everything in **refine** is centered around the `<Refine />` component. As we have already noticed, the `<Refine />` component is passed plenty of props that configure different layers of our React admin panel app.

For example, the `dataProvider`, `authProvider` and `resources` props, which we are covering in this tutorial:

```TypeScript
// Inside src/App.tsx

<Refine
    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
    authProvider={authProvider}
    resources={[
    {
        name: "blog_posts",
        list: "/blog-posts",
        create: "/blog-posts/create",
        edit: "/blog-posts/edit/:id",
        show: "/blog-posts/show/:id",
        meta: {
        canDelete: true,
        },
    },
    {
        name: "categories",
        list: "/categories",
        create: "/categories/create",
        edit: "/categories/edit/:id",
        show: "/categories/show/:id",
        meta: {
        canDelete: true,
        },
    },
    ]}

    // other props
>
</Refine>
```

**refine**'s architecture separates different concerns of the app into indvidual layers backed by their respective contexts. These contexts are then supplied their provider objects containing methods for fulfilling their specific requirements.

For example, the `dataProvider` object represents the context responsible for the app's interaction with backend APIs. It is passed as a value to the `dataProvider` prop of `<Refine />`. The methods inside the `dataProvider` object are defined specifically to handle data fetching for CRUD actions in a **refine** app.

Similarly, the `authProvider` object represents the context that handles authentication and authorization of the app. It is passed as a value to the `authProvider` prop (as you can infer, by convention, the prop and its value have the same identifier). The methods of the `authProvider` object are defined to handle authentication and authorization in a **refine** app. Then, these methods are accessible from consumer components via corresponding hooks.

We dive into detailed implementations of these provider objects and hooks in the upcoming posts.

The `resources` prop, in contrast, is an array of resource items used to declare the names of resources and their valid actions in the app. Since **refine** implements RESTful principles, paths to individual actions are also specified for a resource item. We delve into the `resources` prop in [Unit 3.3](/docs/tutorial/understanding-refine-props/resources).


<Checklist>
<ChecklistItem id="understanding-refine-props">
I understand that {`<Refine />`} props such as <code>dataProvider</code>, <code>authProvider</code> and <code>resources</code> help configure different layers of a <strong>refine</strong> app.
</ChecklistItem>
</Checklist>