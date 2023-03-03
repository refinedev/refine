---
"@pankod/refine-antd": major
---

All **Ant Design** components re-exported from `@pankod/refine-antd` have been removed. You should import them from `antd` package directly.

If the package is not installed, you should install it with your package manager:

```bash
npm install antd
# or
pnpm add antd
# or
yarn add antd
```

After that, you can import components from `antd` package directly like below:

```diff
-import { useTable, SaveButton, Button, Form, Input, Select } from "@pankod/refine-antd";

+import { useTable, SaveButton } from "@refinedev/antd";
+import { Button, Form, Input, Select } from "antd";
```

<br />

`Icons` are also removed from `@pankod/refine-antd`. So, you should import icons from `@ant-design/icons` package directly.

If the package is not installed, you should install it with your package manager:

```bash
npm install @ant-design/icons
# or
pnpm add @ant-design/icons
# or
yarn add @ant-design/icons
```

After that, you can import icons from `@ant-design/icons` package directly like below:

```diff
-import { Icons } from "@pankod/refine-antd";
-const { EditOutlined } = Icons;

+ import { EditOutlined } from "@ant-design/icons";
```
