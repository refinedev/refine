---
"@refinedev/mantine": patch
---

Fixed an issue where the form dirty state was not reset after setting initial values. This caused the form to be dirty even though changes were not made. For this reason, the `<UnSavedChangesNotifier>` always warned when user tried to leave page.
