---
id: create-project
title: 3. Creating your refine project
tutorial:
    prev: tutorial/getting-started/{preferredUI}/prepare-env
    next: tutorial/getting-started/{preferredUI}/generate-crud-pages
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Launch the refine CLI setup

The easiest way to create a new project is using the **refine CLI**. This tool will help you get started quickly by generating a new project with a basic configuration and a folder structure that follows best practices.

1. Launch your terminal and type the following command using your preferred package manager:

    <Tabs
    defaultValue="npm"
    values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

    <TabItem value="npm">

    ```bash
    npm create refine-app@latest -- -o refine-mui tutorial
    ```

    </TabItem>

    <TabItem value="pnpm">

    ```bash
    pnpm create refine-app@latest -- -o refine-mui tutorial
    ```

    </TabItem>

    <TabItem value="yarn">

    ```bash
    yarn create refine-app -- -o refine-mui tutorial
    ```

    > Only supports yarn@1 version.

    </TabItem>

    </Tabs>

2. Confirm `y` to installation of `create-refine-app`

3. The `-o refine-mui` flag in the command above tells the CLI to install the project with the `refine-mui` preset. This preset selects some of the options for you in accordance with this tutorial. Outside of this tutorial, you can skip this flag and select your own options.

4. The CLI will then ask if you agree to share your selection anonymously with the **refine** team. This is for measuring community preferences. You can learn more about it here: [Telemetry](docs/further-readings/telemetry/).

Once the installation wizard is finished, you can close this terminal window and open VS Code to continue your journey.

### Open your project in VS Code

1. Open VS Code and select the directory that was generated during your setup process.

2. Make sure the terminal is open and ready to run commands. You can open it by pressing `Ctrl + J`(Windows) or `Cmd ⌘ + J`(macOS).

For the rest of this tutorial, you can use the terminal within VS Code instead of your computer's terminal.

### Running the dev server

Previewing your project while you work on it is important. To open it as a webpage, the project must be running in development(dev) mode.

<h4>Start the dev server</h4>

To start the dev server, run the following command in your terminal:

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

### Viewing a preview of your app

Your project files contain all the code you need to run your app. To see a preview of your app in the browser:

1. Click on the <a href="http://localhost:3000" rel="noopener noreferrer nofollow">localhost:3000</a> link in the terminal. This will open a new browser tab with your app running in dev mode.

2. You will be redirected to the welcome page as we have not added any pages yet. We will take care of that in the [Next section](/docs/tutorial/getting-started/mui/generate-crud-pages)

Here's what you should see:

```tsx live previewOnly previewHeight=450px url=http://localhost:3000
setInitialRoutes(["/"]);

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { Refine } from "@refinedev/core";
import {
    LightTheme,
    notificationProvider,
    RefineSnackbarProvider,
    WelcomePage,
} from "@refinedev/mui";
import routerBindings from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <BrowserRouter>
                    <Refine
                        routerProvider={routerBindings}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
                    >
                        <Routes>
                            <Route index element={<WelcomePage />} />
                        </Routes>
                    </Refine>
                </BrowserRouter>
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

render(<App />);
```

<Checklist>

<ChecklistItem id="getting-started-mui">
I understood how to create a new project.
</ChecklistItem>
<ChecklistItem id="getting-started-mui-2">
I have run the dev server and previewed my app.
</ChecklistItem>

</Checklist>
