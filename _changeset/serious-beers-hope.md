---
"@pankod/refine-cli": patch
---

Added: `npm -ls` was always throws an error. From now returns `null`, with this way `error` handling can be done when needed.
