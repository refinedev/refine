---
"@refinedev/devtools": major
"@refinedev/devtools-internal": major
"@refinedev/devtools-server": major
"@refinedev/devtools-shared": major
"@refinedev/devtools-ui": major
---

Initial beta release of refine devtools.

We're releasing refine devtools in beta. refine devtools is designed to help you debug and develop your refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating refine packages from the UI and more.

## Usage

Devtools is integrated with `@refinedev/cli` and it will be started automatically in development mode if you have `@refinedev/devtools` installed.

If you want to start devtools manually, you can run `refine devtools` in your project directory.

These commands will start the devtools server, you'll also need to use the `DevtoolsProvider` component in your app to wrap your app with devtools and use the `DevtoolsPanel` component to access the devtools UI from your app. If you want to access the devtools UI outside of your app, you can go to `http://localhost:5001` in your browser.

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

Then you're good to go, `<DevtoolsProvider>` will tell refine to connect to the devtools server and track your queries and mutations. `<DevtoolsPanel>` will render the devtools UI in your app.

After that, you can start the devtools server and start exploring!
