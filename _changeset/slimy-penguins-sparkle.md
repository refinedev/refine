---
"@pankod/refine-inferencer": patch
---

-   Removed the requirement to define resource for relations.
-   Component names and variable names are now generated primarily by label after the resource name.
-   Added a new base interface component
    > ```diff
    > - import {
    > -    AntdShowInferencer,
    > -    AntdEditInferencer,
    > -    AntdListInferencer,
    > -    AntdEditInferencer,
    > - } from "@pankod/refine-inferencer/antd";
    > + import { AntdInferencer } from "@pankod/refine-inferencer/antd";
    >
    > <Refine
    >     ...
    >     resources={[
    >         {
    >             name: "samples",
    > -           list: AntdListInferencer,
    > +           list: AntdInferencer,
    > -           edit: AntdEditInferencer,
    > +           edit: AntdInferencer,
    > -           show: AntdShowInferencer,
    > +           show: AntdInferencer,
    > -           create: AntdEditInferencer,
    > +           create: AntdInferencer,
    >         },
    >
    >     ]}
    > />
    >
    > ```
