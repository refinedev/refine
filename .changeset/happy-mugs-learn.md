---
"@refinedev/core": patch
---

Updated `<WelcomePage />` component to use `RefineContext` to determine if the context is defined or not. It will show an error dialog if the context is not defined. If the error is showing, it means that `<Refine />` component is not mounted or `<WelcomePage />` component is used outside of `<Refine />` component.
