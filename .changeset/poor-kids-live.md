---
"@refinedev/mui": major
---

All **Material UI** components re-exported from `@refinedev/mui` have been removed. You should import them from Material UI packages directly.

If the packages are not installed, you can install them with your package manager:

> You don't have to install all of these packages below. Only install the packages you use.

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
# or
pnpm add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
# or
yarn add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
```

After that, you can import them from related packages directly.

```diff
- import {
-    Box,
-    NumberField,
-    Stack,
-    Typography,
-    ThemeProvider,
-    DataGrid
-    LoadingButton,
- } from "@refinedev/mui";

+ import { NumberField } from "@refinedev/mui";
+ import { ThemeProvider } from "@mui/material/styles";
+ import { Box, Stack, Typography } from "@mui/material";
+ import { DataGrid } from "@mui/x-data-grid";
+ import { LoadingButton } from "@mui/lab";
```
