---
id: about-the-app
title: 1.3. About the App
tutorial:
    prev: tutorial/introduction/prerequisites
    next: tutorial/getting-started/index
---

The app generated is a basic React admin panel for managing blog posts. It is created as default at initialization by [**refine.new**](https://refine.new), which employs the [**refine CLI**](https://refine.new) in the background. Generally, for a custom app, we need to remove the blog post resources and then start tweaking according to our requirements. However, for the simple purposes of this tutorial, we'll stick with the **Blog** app resources.

As we see in [Unit 2.2](/docs/tutorial/getting-started/create-project), we initialize the app using the [**refine.new**](https://refine.new) platform. The stack consists of:

- [**Vite**](https://vitejs.dev/guide/) for managing tooling and configurations
- [**Material UI**](https://mui.com/material-ui/getting-started/overview/) for the UI/UX
- A [**Simple REST API**](https://github.com/refinedev/refine/tree/master/packages/simple-rest) as backend API, developed and hosted by **refine** for learning purposes
- **Custom Athentication** provided by **refine** core and **refine**'s **Material UI** (`@refinedev/mui`) support packages

:::info Using CodeSandbox?
Prefer to go through this tutorial in an online code editor? That's possible!

<details>

<summary>Follow these instructions, then go directly to "Inferencer for CRUD Pages" section!</summary>

**Set up StackBlitz**

1. Click [here](https://codesandbox.io/embed/github/refinedev/refine/tree/master/examples/template-mui?file=src%2FApp.tsx) to open the Material UI template.

2. Click “Sign in” on the top right to log in using your GitHub credentials.

3. In the upper left of the StackBlitz editor window, click the "fork" button to fork the template (save to your own account dashboard).

4. After the project loads, you will see a live preview of the “refine-mui-boilerplate” starter.


**Make Changes**

In the files panel, click on `src/App.tsx` to open it. Afterwards, go to this part of the tutorial to learn how to make changes to this file: [Inferencer for CRUD Pages](/docs/tutorial/getting-started/inferencer-for-crud-pages/)


**Create a GitHub Repository**

1. Press the "Connect Repository" button at the top of your list of files, enter a new name for your repository, and click "Create repo & push".

2. When you have changes to be commit to GitHub, a “Commit” button will appear at the top left of your workspace. Clicking on this will allow you to enter a commit message, and update your repository.


**What's next?**

Now you can navigate to [Inferencer for CRUD Pages](/docs/tutorial/getting-started/inferencer-for-crud-pages) to start building with **refine**!

</details>
:::

<Checklist>
<ChecklistItem id="prequisite-looks-great-3">
I figured out what we're building. Let's head over to <a href="/docs/tutorial/getting-started/index">Unit 2</a> and get to know <strong><a href="https://refine.new">refine.new</a></strong> first!
</ChecklistItem>
</Checklist>
