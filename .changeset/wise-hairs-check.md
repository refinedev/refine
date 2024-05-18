---
"@refinedev/antd": major
---

fix: Date range table filter in Ant Design is broken #5933

- Fixed an issue where date range filters in useTable hook sent invalid date formats, causing errors and crashes.
- Added a transformFilters function to convert date filters to the expected format for GraphQL.
- Updated FilterDropdown component to correctly handle and convert date strings to Dayjs objects on page reload, preventing date.isInvalid errors.

Fixes https://github.com/refinedev/refine/issues/5933
