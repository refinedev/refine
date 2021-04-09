---
id: mobx
title: Mobx
sidebar_label: Mobx
description: Using Mobx in Next.js Project
---

*Simple, scalable state management.*

*Anything that can be derived from the application state, should be. Automatically.*

MobX is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming.  
[Refer to official documentation for detailed usage. &#8594](https://mobx.js.org/README.html)

## Observable state

Mobx uses observables for store values. Properties, entire objects, arrays, Maps and Sets can all be made observable.  
[Refer to official documentation on observable state for detailed usage. &#8594](https://mobx.js.org/observable-state.html)


### Making observable stores with classes

- Make a counter store that holds a `count` state

```ts title="src/mobx/stores/counter/index.ts"
import { makeAutoObservable } from "mobx";

import { ICounter } from "./counter";

export class CounterStore implements ICounter {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }
}
```

```ts title="src/mobx/stores/counter/counter.d.ts"
export interface ICounter {
  count: number;
}
```
:::info
`makeAutoObservable` and its cousin `makeObservable` trap existing object properties and make them observable. `makeAutoObservable` is like `makeObservable` on steroids, as it infers all the properties by default.
:::

- Make a root store that holds the counter store

```ts title="src/mobx/stores/index.ts"
import { iroot } from "./store";
import { CounterStore } from "./counter";
import { ICounter } from "./counter/counter";

export class RootStore implements IRoot {
    counterStore: ICounter;

    constructor() {
        this.counterStore = new CounterStore();
    }
}
```

```ts title="src/mobx/stores/store.d.ts"
import { ICounter } from "./stores/counter/counter";

export interface iroot {
  counterStore: ICounter;
}
```

Before starting to read data from the store, let's add some action.

## Actions

An action is any piece of code that modifies the state.

- Add actions to counter store.

```ts title="src/mobx/stores/counter/index.ts"
import { makeAutoObservable } from "mobx";

import { ICounter } from "./counter";

export class CounterStore implements ICounter {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

// highlight-start
  increase = () => {
    this.count++;
  };

  decrease = () => {
    this.count--;
  };
// highlight-end
}
```

```ts title="src/mobx/stores/counter/counter.d.ts"
export interface ICounter {
  count: number;
// highlight-start
  increase: () => void;
  decrease: () => void;
// highlight-end
}
```

## Using store in components
Firstly store must be made accessible to components. It can be done with `React.useContext`. Then with a custom hook, store can be read from components.

- Make a context to hold store.

```ts title="src/mobx/index.tsx"
import React from "react";

const StoreContext = React.createContext<RootStore | undefined>(undefined);
```

- Use its provider to make store accessible to all components.

```tsx title="src/mobx/index.tsx"
import React from "react";
// highlight-start
import { IRoot } from "./stores/store";
// highlight-end

// highlight-start
let store: IRoot;
// highlight-end

const StoreContext = React.createContext<RootStore | undefined>(undefined);

// highlight-start
export const RootStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};
// highlight-end
```

- Components can read from store via a custom hook.

```tsx title="src/mobx/index.tsx"
import React from "react";
import { IRoot } from "./stores/store";

let store: IRoot;

const StoreContext = React.createContext<RootStore | undefined>(undefined);

export const RootStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

// highlight-start
export const useRootStore = () => {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }

  return context;
};
// highlight-end
```

- Wrap your component with `observer` HOC.

```tsx title="Your Component"
// highlight-start
import { observer } from "mobx-react";
// highlight-end
import { useRootStore } from "@mobx";

// highlight-start
export const MobxExample: React.FC = observer(() => {
// highlight-end
  const { counterStore } = useRootStore();
  const { count, increase, decrease } = counterStore;

  return (
    <div>
      <div>
        <h2>Counter</h2>
        <button
          type="button"
          onClick={increase}
        >
          +
        </button>
        <span>{count}</span>
        <button
          type="button"
          onClick={decrease}
        >
          -
        </button>
      </div>
    </div>
  );
});
```

[Refer to official documentation on React integration for detailed usage. &#8594](https://mobx.js.org/react-integration.html)

:::tip
You might consider using mobx-react-lite instead of mobx-react if you're not using class components.
:::

## Using `mobx-state-tree`

Mobx State Tree provides a better structured state management and tools you need in your app. If you want to use `mobx-state-tree`, you need to make some changes to the files you've created above.

```json title="package.json"
{
  "dependencies": {
    ...
    // highlight-next-line
      "mobx-state-tree": "^5.0.1",
    ...
  }
}
```

### `CounterStore`

`mobx-state-tree` provides a simpler API to create our stores and actions.

```ts title="mobx/stores/counter/index.ts"
import { types } from "mobx-state-tree";

export const CounterStore = types
    .model("Counter", {
        count: 0,
    })
    .actions((counter) => ({
        increase() {
            counter.count += 1;
        },
        decrease() {
            counter.count -= 1;
        },
    }));
```

### `RootStore`

After the changes in `CounterStore` we will need to update `RootStore` with `mobx-state-tree`

```ts title="mobx/stores/index.ts"
import { types } from "mobx-state-tree";
import { CounterStore } from "./counter";

// highlight-start
export const RootStore = types.model("RootStore", {
    counterStore: CounterStore,
});
// highlight-end

export const createRootStore = () =>
    // highlight-start
    RootStore.create({
        counterStore: CounterStore.create(),
    });
    // highlight-end
```

### `RootStoreProvider`

Finally, you need to update `RootStoreProvider` with the `createRootStore` function.

```js title="mobx/index.tsx"
import React from "react";

// highlight-next-line
import { createRootStore } from "./stores";

const StoreContext = React.createContext<
    ReturnType<typeof createRootStore> | undefined
>(undefined);

export const RootStoreProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // highlight-next-line
    const root = createRootStore();

    return (
        <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
    );
};

export const useRootStore = () => {
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider");
    }

    return context;
};
```

## Adding mobx to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

- Install `mobx` and `mobx-react` packages.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```bash
npm install mobx mobx-react
```

  </TabItem>
  <TabItem value="yarn">

```bash
yarn add mobx mobx-react
```

  </TabItem>
</Tabs>


- [Follow instructions beginning from here](#making-observable-stores-with-classes)

[Refer to official documentation on installation for detailed usage. &#8594](https://mobx.js.org/installation.html)
