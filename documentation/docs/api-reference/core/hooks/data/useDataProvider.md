---
id: useDataProvider
title: useDataProvider
---

`useDataProvider` lets you access the `dataProvider` that was configured in [`<Refine>`][Refine] component.

This hook is useful when you need to access the `dataProvider` [Data Provider] from a child component.

## Usage

Let's say that we have a data provider named `default` and second data provider named `second`.

```tsx
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";


const App: React.FC = () => {

    return (
        <Refine
            dataProvider={{
                // highlight-start
                default:  dataProvider("API_URL"),
                second: dataProvider("SECOND_API_URL"),
                // highlight-end
                ...
            }}
        />
    );
};

export default App;

```

Now we can access the `default` data provider from a child component:
```tsx
import {
    // highlight-next-line
    useDataProvider
} from "@pankod/refine-core";

// highlight-start
const dataProvider = useDataProvider();

const defaultDataProvider= dataProvider(); // return default data provider
const secondDataProvider= dataProvider("second"); // return second data provider
// highlight-end
```


## API

### Properties

| Property         | Description                                        | Type     | Default   |
| ---------------- | -------------------------------------------------- | -------- | --------- |
| dataProviderName | The name of the `data provider` you want to access | `string` | `default` |

### Return value

| Description   | Type                                                |
| ------------- | --------------------------------------------------- |
| Data Provider | [`Data Provider`](/core/providers/data-provider.md) |

[Refine]: /core/components/refine-config.md
[Data Provider]: /core/providers/data-provider.md
