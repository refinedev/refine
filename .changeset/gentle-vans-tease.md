---
"@refinedev/antd": minor
---

feat: [`useSelect`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-select/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

```diff
import { useSelect } from '@refinedev/antd';

- const { queryResult, defaultValueQueryResult } = useSelect();
+ const { query, defaultValueQuery } = useSelect();
```

feat: [`useCheckboxGroup`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-checkbox-group/)'s `queryResult` is deprecated, use `query` instead.

```diff
import { useCheckboxGroup } from '@refinedev/antd';

- const { queryResult } = useCheckboxGroup();
+ const { query } = useCheckboxGroup();
```

feat: [`useRadioGroup`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-radio-group/)'s `queryResult` is deprecated, use `query` instead.

```diff
import { useRadioGroup } from '@refinedev/antd';

- const { queryResult } = useRadioGroup();
+ const { query } = useRadioGroup();
```

> ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
>
> ```bash
> npx @refinedev/codemod@latest use-select-query-result
> ```
