---
"@refinedev/cli": patch
---

fix(cli): handle errors while fetching dependencies in get-project-type

When working with `deno` or missing `package.json` file, an error was thrown while determining the project type. This was causing the CLI to crash even though the fallbacks were provided. This PR handles such errors in `getProjectType` and lets it use the fallback type.

[Resolves #6335](https://github.com/refinedev/refine/issues/6335)
