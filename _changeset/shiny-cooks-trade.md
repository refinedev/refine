---
"@refinedev/antd": patch
---

Updated return types of `useSelect`, `useRadioGroup` and `useCheckboxGroup` hooks to only include properties that actually being returned from the hook. Previously, the return types included all properties of the respective components, which was not correct.
