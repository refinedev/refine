---
"@refinedev/mui": patch
---

fix(mui): remove nested interactive elements from button components for better accessibility

Fixed accessibility issue where Material UI button components (CreateButton, EditButton, CloneButton, ListButton, ShowButton) rendered a button element nested inside an anchor element. This caused problems with keyboard navigation (buttons were focused twice) and violated accessibility guidelines.

Changed implementation to use Material UI's Button `component` prop to render the button directly as a link, eliminating the nested structure.

[Resolves #7085](https://github.com/refinedev/refine/issues/7085)
