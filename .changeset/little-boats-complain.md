---
"@refinedev/inferencer": minor
---

Updated the inference process for `list` and `create` actions to use all items in the list instead of just the first item. This is done to avoid breaking the output when a single record is corrupted or wrongfully inferred.

Now, for the `list` and `create` actions, each item in the list response will be used to infer the fields then the most repeated fields will be accepted as the type for the field. 
