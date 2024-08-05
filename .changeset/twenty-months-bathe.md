---
"@refinedev/cli": patch
"@refinedev/devtools-server": patch
"@refinedev/devtools-shared": patch
"@refinedev/devtools-ui": patch
"@refinedev/devtools": patch
"@refinedev/devtools-internal": patch
---

feat(devtools): ability to change the port of the devtools server

Now users can change the port of the devtools server by setting the `REFINE_DEVTOOLS_PORT` environment variable. Previously, the port was hardcoded to "5001" and could not be changed.

If you're using `@refinedev/cli`'s runner commands to start your development server, `REFINE_DEVTOOLS_PORT` will be propagated to your app with appropriate prefix. E.g. if you're using Vite, the environment variable will be `VITE_REFINE_DEVTOOLS_PORT` and it will be used by the `@refinedev/devtools`'s `<DevtoolsProvider />` component to connect to the devtools server.

- In Next.js apps, it will be prefixed with `NEXT_PUBLIC_`
- In Craco and Create React App apps, it will be prefixed with `REACT_APP_`
- In Remix apps and other custom setups, the environment variable will be used as is.

In some scenarios where the environment variables are not passed to the browser, you may need to manually set the Refine Devtools URL in the `<DevtoolsProvider />` component via the `url` prop. Remix apps do not automatically pass environment variables to the browser, so you will need to set the URL manually. If not set, the default URL will be used.

While the port can be changed, this feature also allows users to host the devtools server on a different machine or domain and provide the `<DevtoolsProvider />` with the custom domain URL. This such case will be useful if you're dockerizing your app and devtools server separately.

**Enterprise Edition**: Refine Devtools running on ports other than "5001" is only available in the Enterprise Edition. If you're using the Community Edition, Refine Devtools will not work if the port is changed.

[Resolves #5111](https://github.com/refinedev/refine/issues/5111)
