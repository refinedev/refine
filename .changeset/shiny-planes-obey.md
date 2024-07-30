---
"@refinedev/cli": patch
---

fix(cli): avoid polluting `process.env` with unwanted environment variables

Previously, the `@refinedev/cli` used `dotenv` to load environment variables from `.env` files and populate `process.env`. This caused issues when the users app has a different convention for environment variables, e.g. `.env.development`, `.env.production`, etc.

Now, the `@refinedev/cli` will read the file but avoid populating `process.env` with the variables and keep the values in its scope without passing them to the child processes. This will prevent unwanted environment variables from being passed to the child processes and avoid conflicts with the user's environment variables.

[Resolves #5803](https://github.com/refinedev/refine/issues/5803)
