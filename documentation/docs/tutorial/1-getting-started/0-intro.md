---
id: index
title: 1. Intro
tutorial:
  prev: tutorial/introduction/select-framework
  next: tutorial/getting-started/prepare-env
---

<UIConditional is="antd">

Now that you have selected the **Ant Design** option as your UI preference, let's get started!

</UIConditional>

<UIConditional is="chakra-ui">

Now that you have selected the **Chakra UI** option as your UI preference, let's get started!

</UIConditional>

<UIConditional is="headless">

Now that you have selected the **headless** option as your UI preference, let's get started!

</UIConditional>

<UIConditional is="mantine">

Now that you have selected the **Mantine** option as your UI preference, let's get started!

</UIConditional>

<UIConditional is="mui">

Now that you have selected the **Material UI** option as your UI preference, let's get started!

</UIConditional>

:::info Using CodeSandbox?

Prefer to go through this tutorial in an online code editor? That's possible!

<details>

<summary>Follow these instructions, then go directly to "Generate CRUD pages automatically with Inferencer" section!</summary>

**Set up CodeSandBox**

<UIConditional is="antd">

1. Click [here](https://codesandbox.io/s/github/refinedev/refine/tree/master/examples/template-antd?file=src%2FApp.tsx) to open the Ant Design template.

</UIConditional>

<UIConditional is="chakra-ui">

1. Click [here](https://codesandbox.io/s/github/refinedev/refine/tree/master/examples/template-chakra-ui?file=src%2FApp.tsx) to open the Chakra UI template.

</UIConditional>

<UIConditional is="headless">

1. Click [here](https://codesandbox.io/s/github/refinedev/refine/tree/master/examples/template-headless?file=src%2FApp.tsx) to open the headless template.

</UIConditional>

<UIConditional is="mantine">

1. Click [here](https://codesandbox.io/s/github/refinedev/refine/tree/master/examples/template-mantine?file=src%2FApp.tsx) to open the Mantine template.

</UIConditional>

<UIConditional is="mui">

1. Click [here](https://codesandbox.io/s/github/refinedev/refine/tree/master/examples/template-material-ui?file=src%2FApp.tsx) to open the Material UI template.

</UIConditional>

2. Click “Sign in” on the top right to log in using your GitHub credentials.

3. In the upper right of the CodeSandBox editor window, click the "fork" button to fork the template (save to your own account dashboard).

<UIConditional is="antd">

4. After the project loads, you will see a live preview of the “refine-antd-boilerplate” starter.

</UIConditional>

<UIConditional is="chakra-ui">

4. After the project loads, you will see a live preview of the “refine-chakra-ui-boilerplate” starter.

</UIConditional>

<UIConditional is="headless">

4. After the project loads, you will see a live preview of the “refine-headless-boilerplate” starter.

</UIConditional>

<UIConditional is="mantine">

4. After the project loads, you will see a live preview of the “refine-mantine-boilerplate” starter.

</UIConditional>

<UIConditional is="mui">

4. After the project loads, you will see a live preview of the “refine-mui-boilerplate” starter.

</UIConditional>

**Make Changes**
<UIConditional is="antd">

In the files panel, click on `src/app.tsx` to open it. Afterwards, go to this part of the tutorial to learn how to make changes to this file: [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/antd/generate-crud-pages/)

</UIConditional>

<UIConditional is="chakra-ui">

In the files panel, click on `src/app.tsx` to open it. Afterwards, go to this part of the tutorial to learn how to make changes to this file: [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/chakra-ui/generate-crud-pages/)

</UIConditional>

<UIConditional is="headless">

In the files panel, click on `src/app.tsx` to open it. Afterwards, go to this part of the tutorial to learn how to make changes to this file: [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/headless/generate-crud-pages/)
</UIConditional>

<UIConditional is="mantine">

In the file pane, you should see `src/app.tsx`. Click to open it, and follow [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/mantine/generate-crud-pages/) to make a change to this file.

</UIConditional>

<UIConditional is="mui">

In the files panel, click on `src/app.tsx` to open it. Afterwards, go to this part of the tutorial to learn how to make changes to this file: [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/mui/generate-crud-pages/)

</UIConditional>

**Create a GitHub Repository**

1. Press the "Connect Repository" button at the top of your list of files, enter a new name for your repository, and click "Create repo & push".

2. When you have changes to be commit to GitHub, a “Commit” button will appear at the top left of your workspace. Clicking on this will allow you to enter a commit message, and update your repository.

**What's next?**
<UIConditional is="antd">

Now you can navigate to [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/antd/generate-crud-pages) to start building with Refine!
</UIConditional>

<UIConditional is="chakra-ui">

Now you can navigate to [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/chakra-ui/generate-crud-pages) to start building with Refine!

</UIConditional>

<UIConditional is="headless">

Now you can navigate to [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/headless/generate-crud-pages) to start building with Refine!

</UIConditional>

<UIConditional is="mantine">

Now you can navigate to [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/mantine/generate-crud-pages) to start building with Refine!

</UIConditional>

<UIConditional is="mui">

Now you can navigate to [Generate CRUD pages automatically with Inferencer](/docs/tutorial/getting-started/mui/generate-crud-pages) to start building with Refine!

</UIConditional>

</details>

:::

<h3>Where are we going?</h3>

In this unit, we will be covering the following steps:

- Setting up your development environment.
- Creating a new project.
- Generating CRUD pages for your data model.
- Storing your project in a git repository.
- Deploying your project to the cloud.

<h3> What will we be building?</h3>

<UIConditional is="antd">

[refine.new](https://refine.new/) is an interactive tool that lets you create Refine apps right in your browser. You can view the app we'll build during the tutorial from [this link](https://refine.new/preview/a4f6eb83-2dd7-453b-b26a-4d3f48eeb543).

 <div className="centered-image"  >
<a href="https://refine.new/preview/a4f6eb83-2dd7-453b-b26a-4d3f48eeb543">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/tutorial/antd-intro.png" alt="tutorial antd" />
  </a>
</div>

</UIConditional>

<UIConditional is="chakra-ui">

[refine.new](https://refine.new/) is an interactive tool that lets you create Refine apps right in your browser. You can view the app we'll build during the tutorial from [this link](https://refine.new/preview/abc18685-8a6d-4511-aedd-860ca1b0b5a6).

 <div className="centered-image">
<a href="https://refine.new/preview/abc18685-8a6d-4511-aedd-860ca1b0b5a6">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/tutorial/chakra-intro.png" alt="tutorial chakra" />
  </a>
</div>
</UIConditional>

<UIConditional is="headless">

[refine.new](https://refine.new/) is an interactive tool that lets you create Refine apps right in your browser. You can view the app we'll build during the tutorial from [this link](https://refine.new/preview/c8958d55-8995-4bb7-b91e-e5f924b53aa7).

 <div className="centered-image">
<a href="https://refine.new/preview/c8958d55-8995-4bb7-b91e-e5f924b53aa7">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/tutorial/headless-intro.png" alt="tutorial headless" />
  </a>
</div>

</UIConditional>

<UIConditional is="mantine">

[refine.new](https://refine.new/) is an interactive tool that lets you create Refine apps right in your browser. You can view the app we'll build during the tutorial from [this link](https://refine.new/preview/3fd65b0d-534f-4a4b-89eb-c0a325cf6213).

 <div className="centered-image">
<a href="https://refine.new/preview/3fd65b0d-534f-4a4b-89eb-c0a325cf6213">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/tutorial/mantine-intro.png" alt="tutorial mantine" />
  </a>
</div>
</UIConditional>

<UIConditional is="mui">

[refine.new](https://refine.new/) is an interactive tool that lets you create Refine apps right in your browser. You can view the app we'll build during the tutorial from [this link](https://refine.new/preview/9203fae6-02ef-4c77-a196-5532e953e29d).

 <div className="centered-image"  >
<a href="https://refine.new/preview/9203fae6-02ef-4c77-a196-5532e953e29d">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/tutorial/mui-intro.png" alt="tutorial antd" />

  </a>
</div>

</UIConditional>

<br/>

🏄 If you're a busy developer, you can quickly download the final version of the application by clicking on the **"Build & Download"** button.

<br/>

<Checklist>

<ChecklistItem id="getting-started">
Let's prepare to build a Refine project!
</ChecklistItem>

</Checklist>
