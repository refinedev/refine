---
id: about-the-app
title: 3. About the App
tutorial:
    order: 2
    prev: tutorial/introduction/prequisite
    next: tutorial/getting-started/index
---

Our app is a basic admin panel to manage blog posts. It will be created as default at initialization by the **refine.new**, which employs the **refine CLI** in the background. Generally, for your custom app, you need to remove the blog app resources and then start tweaking according to your requirements. However, for the simple purposes of this tutorial, we'll stick with the blog app.

As you'll see in the next post, we will initialize the app using the **refine.new** platform.

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


<h3>Where are we going?</h3>

In this unit, we will be covering the following steps:

-   Setting up your development environment.
-   Creating a new project.
-   Generating CRUD pages for your data model.
-   Storing your project in a git repository.
-   Deploying your project to the cloud.

As you make changes to your project, you can commit them to your GitHub repository. Netlify listens for changes to your GitHub repository to automatically rebuilds and deploys your application on every commit. This allows anyone to access and view the latest version of your app.

<Checklist>

<ChecklistItem id="getting-started">
Let's prepare to build a refine project!
</ChecklistItem>

</Checklist>
