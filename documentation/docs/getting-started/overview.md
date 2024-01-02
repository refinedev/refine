---
title: Overview
slug: /
displayed_sidebar: mainSidebar
---

## What is Refine?

**Refine** is a meta **React** framework that enables the rapid development of a wide range of web applications. From internal tools, admin panels, B2B apps and dashboards, it serves as a comprehensive solution for building any type of **CRUD** applications.

Refine's internal hooks and components simplifies the development process and eliminates the repetitive tasks by providing industry-standard solutions for crucial aspects of a project, including **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**.

Here's an overview of the Refine structure:

```tsx title="App.tsx"
const App = () => (
  <Refine
    dataProvider={dataProvider}
    resources={[
      {
        name: "blog_posts",
        list: "/blog-posts",
        show: "/blog-posts/show/:id",
        create: "/blog-posts/create",
        edit: "/blog-posts/edit/:id",
      },
    ]}
  >
    /* ... */
  </Refine>
);
```

 <div  >
  <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/tutorial/tutorial-generic-app.png" alt="tutorial antd" />
</div>

<br/>

⚡ **Refine** is _headless by design_ and offers unlimited styling and customization possibilities, empowering developers to create tailored and fully functional applications that meet specific project requirements.

Utilizing integrated technologies you can efforlessly develop industry-standard CRUD applications with **Refine**.

## What do you mean by "headless" ?

Instead of being limited to a set of pre-styled components, **Refine** provides collections of helper `hooks`, `components` and `providers` and more. Since business logic and UI are completely decoupled, you can customize UI without constraints.

It means, **Refine** just works _seamlessly_ with any _custom designs_ or _UI frameworks_. Thanks to it's headless architecture, you can use popular CSS frameworks like [TailwindCSS](https://tailwindcss.com/) or even create your own styles from scratch.

Refine also provides integrations with [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) to get you started quickly. These libraries are set of components which are nicely integrated with headless `@refinedev/core` package.

### Headless in Routing

For the routing, Refine's headless approach shines too. It doesn't tie you to a single routing method or library. Instead, it offers a simple routing interface with built-in integrations for popular libraries.

This means you can use Refine seamlessly in different platforms like React Native, Electron, Next.js, Remix etc. without any extra steps for the setup.

## Use cases

**Refine** shines when it comes to _data-intensive_ applications like _admin panels_, _dashboards_ and _internal tools_.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/diagram.png" alt="Refine diagram" />

## Key Features

⚙️ Zero-config, **one-minute setup** with a **single CLI command**

🔌 Connectors for **15+ backend services** including [REST API](https://github.com/refinedev/refine/tree/master/packages/simple-rest), [GraphQL](https://github.com/refinedev/refine/tree/master/packages/graphql), [NestJs CRUD](https://github.com/refinedev/refine/tree/master/packages/nestjsx-crud), [Airtable](https://github.com/refinedev/refine/tree/master/packages/airtable), [Strapi](https://github.com/refinedev/refine/tree/master/packages/strapi), [Strapi v4](https://github.com/refinedev/refine/tree/master/packages/strapi-v4), [Strapi GraphQL](https://github.com/refinedev/refine/tree/master/packages/strapi-graphql), [Supabase](https://github.com/refinedev/refine/tree/master/packages/supabase), [Hasura](https://github.com/refinedev/refine/tree/master/packages/hasura), [Appwrite](https://github.com/refinedev/refine/tree/master/packages/appwrite), [Firebase](https://firebase.google.com/), [Nestjs-Query](https://github.com/refinedev/refine/tree/master/packages/nestjs-query) and [Directus](https://directus.io/).

🌐 **SSR support** with **Next.js** or **Remix**

🔍 Auto-generation of **CRUD** UIs based on **your API data structure**

⚛ Perfect **state management** & **mutations** with **React Query**

🔀 **Advanced routing** with any router library of your choice

🔐 Providers for seamless **authentication** and **access control** flows

⚡ Out-of-the-box support for **live / real-time applications**

📄 Easy **audit logs** & **document versioning**

💬 Support for any **i18n** framework

💪 Future-proof, **robust architecture**

⌛️ Built-in [CLI](/docs/packages/cli) with time-saving features

💻 Refine [Devtools](https://github.com/refinedev/refine/blob/master/packages/devtools/README.md) - dive deeper into your app and provide useful insights

✅ Full **test coverage**

## Community

**Refine** has a very friendly community and we are always happy to help you get started:

- [🌟 Apply for the Priority support program!](https://s.refine.dev/enterprise) You can apply to priority support program and receive assistance from the Refine **core** team in your **private** channel.
- [Join the Discord community!](https://discord.gg/refine) It is the easiest way to get help and ask questions to the community.
- [Join the GitHub Discussions](https://github.com/refinedev/refine/discussions) to ask anything about the Refine project or give feedback; we would love to hear your thoughts!
- [Learn how to contribute to the Refine!](/docs/guides-concepts/contributing/)
- [Join our Guest Technical Writer Program](https://refine.dev/blog/refine-writer-program/) and become a blog writer for **Refine**.

## Next Steps

👉 Continue with the [Quickstart guide](/docs/getting-started/quickstart/) to setup and run your first **Refine** project.

👉 Jump directly to the [Tutorial](/docs/tutorial/introduction/index/) to learn Refine by building a full-blown CRUD application.
