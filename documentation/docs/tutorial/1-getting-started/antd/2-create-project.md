---
id: create-project
title: 2. Create your refine project
tutorial:
    prev: tutorial/getting-started/{preferredUI}/prepare-env
    next: tutorial/getting-started/{preferredUI}/generate-crud-pages
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Launch the refine CLI setup

The easiest way to create a new project is to use the **refine CLI**. This tool will help you get started quickly by generating a new project with a basic configuration and a folder structure that follows best practices.

1- Launch your terminal and type the following command using your preferred package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm create refine-app@latest -- -o refine-antd tutorial
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm create refine-app@latest -- -o refine-antd tutorial
```

</TabItem>

<TabItem value="yarn">

```bash
yarn create refine-app -- -o refine-antd tutorial
```

</TabItem>

</Tabs>

2- Confirm `y` to installation of `create-refine-app`

3- We are using `-o refine-antd` flag to bootstrap the app with pre-selected CLI options. The tutorial will proceed according to these selections.

4-The CLI will ask if you agree to share your choices anonymously with the **refine** team. This is for measuring community preferences. You are free to share or not.

Once the installation wizard is finished, you can close this terminal window and open VS Code to continue your journey.

### Open your project in VS Code

1- Open Visual Studio Code and select the directory that was generated during your setup process.

2- Make sure the terminal is open and ready to run commands. You can open it by pressing `Ctrl + J`(Windows) or `Cmd ⌘ + J`(macOS).

For the rest of this tutorial, you can use the terminal within VS Code instead of your computer's terminal.

### Running refine in dev mode

To preview your project as a web page while you work on it, the project must be running in development (dev) mode.

#### Start the dev server

1- To start the dev server, run the following command in your terminal:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm run dev
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm run dev
```

</TabItem>

<TabItem value="yarn">

```bash
yarn run dev
```

</TabItem>

</Tabs>

You should see confirmation in the terminal that the **refine** app is running in dev mode.

### Viewing a preview of your website

Your project files contain all the code you need to run your app. To see a preview of your app in the browser:

1- Click on the `localhost:3000` link in the terminal. This will open a new browser tab with your website.

(**refine** uses port 3000 by default)

2- You will be redirected to the welcome page as we have not added any pages yet.

([Next section](/docs/tutorial/getting-started/antd/generate-crud-pages) will guide you through adding pages to your app.)

Here's what you should see:

```tsx live previewOnly previewHeight=450px url=http://localhost:3000
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ReadyPage,
    notificationProvider,
    ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine-antd/dist/reset.css";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
        />
    );
};

render(<App />);
```




<Checklist>

<ChecklistItem id="getting-started-antd">
I'm able to create a new refine project with Ant Design
</ChecklistItem>
<ChecklistItem id="getting-started-antd-2">
I am able to start the refine dev server.
</ChecklistItem>


</Checklist>