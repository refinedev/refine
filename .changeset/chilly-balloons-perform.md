---
"@refinedev/chakra-ui": patch
---

fix: issue with Chakra-UI sider that overflows when collapsed

When we try to collapse the sider it overflows so changed overflow-x property to hidden whereas overflow-y remains auto.

It is expected to improve the user interface and resolve the mentioned bug.

Issue : [https://github.com/refinedev/refine/issues/5475]  
PR raised : [https://github.com/refinedev/refine/pull/5480]
