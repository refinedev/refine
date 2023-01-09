---
"@pankod/refine-cli": patch
---

Fixed: `ReferenceError: btoa is not defined`. #3366 use `Buffer.from` when `btoa` is `"undefined"` for base64 encoding.
