---
"@refinedev/chakra-ui": patch
---

fix: issue with Chakra-UI sider that overflows when collapsed #5475

When we try to collapse the sider it overflows so changed overflow-x property to hidden whereas overflow-y remains auto.
