---
"@refinedev/mui": patch
---

fix: if user info is not provided by `authProvider`, don't render `<ThemedHeaderv2 />`. Otherwise, render it based on user data from `authProvider`
