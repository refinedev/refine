---
"@pankod/refine-antd": patch
"@pankod/refine-mantine": patch
"@pankod/refine-mui": patch
---

Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.
