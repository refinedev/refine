# Building a PDF Invoicer app with Refine and Deploying It on DigitalOcean

## Introduction

In this tutorial, we will build a B2B React CRM application with [Refine Framework](https://github.com/refinedev/refine) and deploy it to [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/).

At the end of this tutorial, we'll have a PDF Invoicer application that includes:

- Accounts pages to list, create, edit and show accounts.
- Clients pages to list, create, edit and show clients.
- Invoice pages to list, create, edit, show and export as PDF

While doing these, we'll use the:

- Strapi cloud-based headless CMS to store our data. To fetch data from Strapi, we'll use the built-in Strapi [data-provider](https://refine.dev/docs/data/packages/strapi-v4/) of Refine.
- [Ant Design](https://ant.design/) UI library.
- Once we've build the app, we'll put it online using [DigitalOcean's App Platform](https://www.digitalocean.com/). This service makes it really easy and fast to set up, launch, and grow apps and static websites. You can deploy code by simply pointing to a GitHub repository and let App Platform do the heavy lifting of managing the infrastructure, app runtimes, and dependencies.

You can get the final source code of the application on [GitHub](https://github.com/refinedev/refine/master/examples/invoicer).

[slideshow https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/dashboard-deal-chart.png https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/companies-list-page.png https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/companies-create-page.png https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/companies-edit-page.png https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/companies-show-page.png https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/contacts-list-page.png https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/contacts-create-page.png https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/contacts-edit-page.png https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/contacts-show-page.png]

## Prerequisites

- A local development environment for Node.js. You can follow the [How To Install Node.js and Create a Local Development Environment](https://www.digitalocean.com/community/tutorial-series/how-to-install-node-js-and-create-a-local-development-environment).
- Some preliminary knowledge of React and TypeScript. You can follow the [How To Code in React.js](https://www.digitalocean.com/community/tutorial-series/how-to-code-in-react-js) and [Using TypeScript with React](https://www.digitalocean.com/community/tutorials/react-typescript-with-react) series.
- A GitHub account to host the code.
- A DigitalOcean account. You can create one for free if you don't have one already.

## Step 1 — What is Refine?

[Refine](https://refine.dev/) is a React meta-framework for building data-intensive B2B CRUD web applications like internal tools, dashboards, and admin panels. It ships with various hooks and components to reduce the development time and increase the developer experience.

It is designed to build production-ready enterprise B2B apps. Instead of starting from scratch, it provides essential hooks and components, to help with tasks such as data & state management, handling authentication, and managing permissions.

So, you can focus on building the important parts of your app without getting bogged down in the technical stuff.

Refine is particularly effective in situations where managing data is key, such as:

- **Internal tools**:
- **Dashboards**:
- **Admin panels**:
- **All type of CRUD apps**

### Customization and styling

Refine's headless architecture allows the flexibility to use any UI library or custom CSS. Additionaly it has built-in support for popular open-source UI libraries, including Ant Design, Material UI, Mantine, and Chakra UI.

## Step 2 — Setting Up the Project

We'll use the `npm create refine-app` command to interactively initialize the project.

```bash
npm create refine-app@latest
```

Select the following options when prompted:

```bash
✔ Choose a project template · Vite
✔ What would you like to name your project?: · crm-app
✔ Choose your backend service to connect: · NestJS Query
✔ Do you want to use a UI Framework?: · Ant Design
✔ Do you need any Authentication logic?: · None
✔ Do you need i18n (Internationalization) support?: · No
✔ Choose a package manager: · npm
```

Once the setup is complete, navigate to the project folder and start your app with:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to see the app.

![Welcome Page](https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-14-refine-digital-ocean/welcome.jpeg)

---
