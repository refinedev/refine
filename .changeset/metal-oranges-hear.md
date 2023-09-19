---
"@refinedev/devtools": major
"@refinedev/devtools-internal": major
"@refinedev/devtools-server": major
"@refinedev/devtools-shared": major
"@refinedev/devtools-ui": major
---

Initial beta release of refine devtools.🎉

We're releasing refine devtools in beta. refine devtools is designed to help you debug and develop your refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating refine packages from the UI and more. 🤯

## Usage

Install the dependencies using your package manager.

```bash
npm i @refinedev/devtools@latest @refinedev/cli@latest
```

Add `<DevtoolsProvider>` and `<DevtoolsPanel>` components to your app:

You'll need to wrap your app with `<DevtoolsProvider>` component and add `<DevtoolsPanel>` component to your app to access the devtools UI.

```tsx
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";

const App = () => {
    return (
        <DevtoolsProvider>
            <Refine
            // ...
            >
                {/* ... */}
            </Refine>
            <DevtoolsPanel />
        </DevtoolsProvider>
    );
};
```

Then you're good to go 🙌, `<DevtoolsProvider>` will tell refine to connect to the devtools server and track your queries and mutations. `<DevtoolsPanel>` will render the devtools UI in your app.

Devtools is integrated with `@refinedev/cli` and it will be started automatically in development mode if you have `@refinedev/devtools` installed.

If you want to start devtools manually, you can run `refine devtools` in your project directory.

These commands will start the devtools server. If you want to access the devtools UI outside of your app without depending on the `<DevtoolsPanel>` component, you can go to `http://localhost:5001` in your browser. 🚀
