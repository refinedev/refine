---
"@refinedev/cli": patch
---

fix: Remix v2 requires build path as argument for `remix-serve` but Refine CLI was not passing it.
From now on, Refine CLI will pass the build path as argument to `remix-serve` command and uses the default `./build/index.js` if not provided.

You can pass the build path as argument to `refine start` command.

```json
// package.json

{
  "scripts": {
    "start": "refine start ./build/index.js"
  }
}
```
