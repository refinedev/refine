---
"@refinedev/mui": patch
---

fix: add missing DataGrid operator conversion cases

MUI defines the operator for each column types in [here](https://github.com/mui/mui-x/tree/2d09dbc6e5d03c4e66765d225ef93d3984e300fc/packages/grid/x-data-grid/src/colDef). However, there were not enough conversion cases for the following operators, so this changes added them to the mapping.

-   isAnyof: used in Numeric, SingleSelect, String
-   contains: used in String,
-   startsWith: used in String
-   endsWith: used in String
