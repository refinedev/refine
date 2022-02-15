---
id: useDataProvider
title: useDataProvider
---

`useDataProvider` lets you access the `dataProvider` that was configured in [`<Refine>`][Refine] component.

This hook is useful when you need to access the `dataProvider` [Data Provider] from a child component.

## Usage

Let's say that we have a data provider named `default` and another data provider named `another`.

```tsx
import { Refine } from "@pankod/refine-core";

import {
    // highlight-next-line
    useDataProvider
} from "@pankod/refine-core";

const App: React.FC = () => {
// highlight-start
const defaultDataProvider = useDataProvider();
const anotherDataProvider = useDataProvider("anotherDataProvider");
// highlight-end
    return (
        <Refine
            dataProvider={{
                // highlight-start
                default: defaultDataProvider,
                another: anotherDataProvider
                // highlight-end
                ...
            }}
        />
    );
};

export default App;

```

## API

### Return value

| Description   | Type     |
| ------------- | -------- |
| Data Provider | `string` |

[Refine]: /core/components/refine-config.md
[Data Provider]: /core/providers/data-provider.md
