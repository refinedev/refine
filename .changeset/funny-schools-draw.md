---
"@refinedev/devtools-shared": patch
---

chore(devtools-shared): add login callback events

Added new events to handle login errors on the main devtools window rather than external windows. This change is accompanied by new event handlers in the `@refinedev/devtools-ui` and `@refinedev/devtools-server` packages.
