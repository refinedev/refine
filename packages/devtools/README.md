<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/refine_logo.png"  align="center" />
    </a>
</div>
<br/>
<div align="center">refine is an open-source, headless React framework for developers building enterprise web applications.

It eliminates repetitive tasks in CRUD operations and provides industry-standard solutions for critical project components like **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**.
</div>

## About

[refine](https://refine.dev/) is **headless by design**, offering unlimited styling and customization options. Moreover, refine ships with ready-made integrations for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience.

refine has connectors for 15+ backend services, including REST API, [GraphQL](https://graphql.org/), and popular services like [Airtable](https://www.airtable.com/), [Strapi](https://strapi.io/), [Supabase](https://supabase.com/), [Firebase](https://firebase.google.com/), and [Directus](https://directus.io/)

[Refer to documentation for more info about refine](https://refine.dev/docs/)
[Step up to refine tutorials](https://refine.dev/docs/tutorial/introduction/index/)

---
![refine devtools](https://github.com/refinedev/refine/assets/1110414/15ed6907-d0c8-4213-9024-2f6b0a09968f)

  We're releasing refine devtools in beta. refine devtools is designed to help you debug and develop your refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating refine packages from the UI and more. 🤯

## Usage

Install latest version of `@refinedev/cli`:

```bash
npm install @refinedev/cli@latest
```

Install `@refinedev/devtools` with `@refinedev/cli`

```bash
npm run refine devtools init
```
> 🚨 If you don't have `@refinedev/cli` installed already, you can follow the [installation guide](https://refine.dev/docs/packages/documentation/cli/#how-to-add-to-an-existing-project) to add it to your project.

![devtools-install](https://github.com/refinedev/refine/assets/23058882/7d7341cc-1edd-4cf3-b330-1796c6a8afc5)



Ta-da! 🎉 Everything is ready now, you can use the refine devtools in your project! 🕶

> Devtools only works in development mode and have no overhead on production builds. You don't need to do anything special to exclude DevTools from your bundle.
