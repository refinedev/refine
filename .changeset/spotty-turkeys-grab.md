---
"@refinedev/devtools-server": patch
---

refactor(devtools-server): handle project id without polluting user console

When project ID is missing in the project, Devtools Server was returning with `400` and `404` status codes, which leads to unwanted logs in the user console. To avoid this, the server now returns a `200` status code with an error message in the response body. This change is accompanied by a new error handler in the `@refinedev/devtools-ui` package to handle the error message and display it in the user interface.
