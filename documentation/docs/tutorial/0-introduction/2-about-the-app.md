---
id: about-the-app
title: 3. About the app
tutorial:
    order: 2
    prev: tutorial/introduction/prerequisites
    next: tutorial/getting-started/index
---

The app generated is a basic admin panel to manage blog posts. It is created as default at initialization by [**refine.new**](https://refine.new), which employs the [**refine CLI**](https://refine.new) in the background. Generally, for your custom app, we need to remove the blog app resources and then start tweaking according to your requirements. However, for the simple purposes of this tutorial, we'll stick with the resources related to the blog.

As we'll see in the next unit, we initialize the app using the [**refine.new**](https://refine.new) platform. The stack consists of:

- Vite for managing configurations

- Material UI for frontend UI

- A [**Simple REST API**](https://github.com/refinedev/refine/tree/master/packages/simple-rest) as backend API, developed and hosted by **refine** for learning purposes

- Custom **refine** Athentication provided by **refine** core and **refine**'s **Material UI** (`@refinedev/mui`) support packages

:::info Using CodeSandbox?
Prefer to go through this tutorial in an online code editor? That's possible!

<details>

<summary>Follow these instructions, then go directly to "Generate CRUD pages automatically with Inferencer" section!</summary>

**Set up StackBlitz**

<UIConditional is="mui">

1. Click [here](https://codesandbox.io/embed/github/refinedev/refine/tree/master/examples/template-mui?file=src%2FApp.tsx) to open the Material UI template.

</UIConditional>

2. Click “Sign in” on the top right to log in using your GitHub credentials.

3. In the upper left of the StackBlitz editor window, click the "fork" button to fork the template (save to your own account dashboard).

<UIConditional is="mui">

4. After the project loads, you will see a live preview of the “refine-mui-boilerplate” starter.

</UIConditional>

**Make Changes**

<UIConditional is="mui">

In the files panel, click on `src/App.tsx` to open it. Afterwards, go to this part of the tutorial to learn how to make changes to this file: [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/mui/generate-crud-pages/)

</UIConditional>


**Create a GitHub Repository**

1. Press the "Connect Repository" button at the top of your list of files, enter a new name for your repository, and click "Create repo & push".

2. When you have changes to be commit to GitHub, a “Commit” button will appear at the top left of your workspace. Clicking on this will allow you to enter a commit message, and update your repository.

**What's next?**

<UIConditional is="mui">

Now you can navigate to [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/mui/generate-crud-pages) to start building with **refine**!

</UIConditional>

</details>
:::

<Checklist>

<ChecklistItem id="getting-started">
Let's head over to the next unit and get to know **refine.new** first!
</ChecklistItem>

</Checklist>
