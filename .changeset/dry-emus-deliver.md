---
"@refinedev/cli": minor
---

feat: added "integration" option to "add" command.

Now you can run the following command to add integration into your existing project:

```bash
> npm run refine add integration

? Which integration do you want to add? (Use arrow keys)
❯ Ant Design - Setup Ant Design with Refine
  React Router - Setup routing with React Router
```

For now, `Ant Design` integration doesn't support `NextJS` and `Remix` projects.
