---
"@refinedev/devtools-ui": patch
---

chore(devtools-ui): fix slider image loader

In the welcome page of the Devtools UI, feature slider was re-mounting every image at transition, causing polluted network tab in the browser even though the images were cached and loaded already. This change fixes the issue by loading the images only once and reusing them on transition.
