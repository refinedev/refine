## `<Refine />` Props

As we mentioned earlier, almost everything in **refine** is centered around the `<Refine />` component. As we have already noticed, the `<Refine />` component have several props, among plenty others.

For example, we are covering `dataProvider`, `authProvider` and `resources` props in this tutorial:

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

**refine**'s architecture segregates different components of the app into individual contexts, which are then supplied with their individual provider objects containing methods specific to the requirements they are implementing.

For example, the `dataProvider` object represents the context responsible for the app's interaction with backend APIs. It is passed as a value to the `dataProvider` prop of `<Refine />`. The methods inside the `dataProvider` object is defined specifically to handle data fetching for CRUD actions in a **refine** app.

Similarly, the `authProvider` object represents the context that handles authentication and authorization of the app. It is passed as a value to the `authProvider` prop (as you can infer, by convention, the prop and its value have the same identifier). The methods of the `authProvider` object are defined to handle authentication and authorization in a **refine** app.

Then, these methods are accessible from consumer components via correspondnig hooks. We dive into detailed implementations of these provider objects and hooks in the upcoming posts.

The `resources` prop, in contrast, does not rely on a context. It is an array of resource items used to directly declare the names of resources in the app and possible actions on each resource. Since **refine** implements RESTful API principles, paths to individual actions are also specified for a resource item. We delve into the `resources` prop in [Unit 2.2]().