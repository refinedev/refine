---
id: redux-toolkit
title: Redux Toolkit
sidebar_label: Redux Toolkit
description: How to Use Redux Toolkit in Next.js?
---

Redux is a predictable state container for JavaScript apps. Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.  
[Refer to official Redux documentation for detailed usage. &#8594](https://redux.js.org/introduction/getting-started)  
[Refer to official Redux Toolkit documentation for detailed usage. &#8594](https://redux-toolkit.js.org/introduction/quick-start)

superplate serves an optional `redux` plugin that uses `@reduxjs/toolkit`
### Configure Store & Setup Reducers and Slices

- Create a store with a root reducer

[Refer to official documentation on configuring store for detailed usage. &#8594](https://redux-toolkit.js.org/api/configureStore)

```ts title="src/redux/store.ts"
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

export default configureStore({ reducer: rootReducer });
 ```

-  Add a root reducer that combines reducers.

[Refer to official documentation on combineReducers for detailed usage. &#8594](https://redux.js.org/recipes/structuring-reducers/using-combinereducers)


 ```ts title="src/redux/reducers.ts"
import { combineReducers } from "redux";

import counter from "@redux/slices/counter";

export default combineReducers({ counter });
```
<br/>

`createSlice` accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.  

- Add counter slice. [Export `reducer` as default and actions as named exports.](https://github.com/erikras/ducks-modular-redux)

```ts title="src/redux/slices/counter/index.ts"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 20,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: (state) => {
            state.count++;
        },
        decrease: (state) => {
            state.count--;
        },
    },
});

export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;
```

:::info
Since Redux Toolkit uses Immer under the hood, you can use mutating immutable updates.
```js
increase(state) {
  // highlight-start
    state.value++
  // highlight-end
},
```
:::

- Pass `store` to `Provider` from React-Redux in `_app.tsx`
```tsx title="pages/_app.tsx"
import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "@redux/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
```

Now everything's ready to read data from store and dispatch some actions to make changes to store state.

:::tip

All this work will be handled automatically by CLI, so you don’t need to do anything extra as long as you choose **Redux Toolkit** plugin during the project creation phase.

:::
### Hooks (useSelector & useDispatch)

`useSelector` from React-Redux is used to read data from store. It accepts a single selector function. A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.

The React-Redux also provides a `useDispatch` hook that gives us the store's dispatch method as its result. This method is used to dispatch actions to make changes to the store state.

```tsx title="src/components/counter/index.tsx"
import React from "react";
// highlight-start
import { useDispatch, useSelector } from "react-redux";
// highlight-end

import { increase, decrease } from "@redux/actions";
import { IState } from "@redux/istate";

export default function Counter() {
  // highlight-start
  const dispatch = useDispatch();
  const count = useSelector((state: IState) => state.counter.count);
  // highlight-end
  
  return (
    <div>
      <div>
        <h2>Counter</h2>
        <button
          type="button"
          // highlight-start
          onClick={() => dispatch(increase())}
          // highlight-end
        >
          +
        </button>
        <span>{count}</span>
        <button
          type="button"
          // highlight-start
          onClick={() => dispatch(decrease())}
          // highlight-end
        >
          -
        </button>
      </div>
    </div>
  );
}
```
[Refer to official documentation on Hooks usage for detailed usage. &#8594](https://redux.js.org/tutorials/fundamentals/part-5-ui-react#reading-state-from-the-store-with-useselector)

`increase` and `decrease` are action creator methods that return actual action objects for dispatch. They are generated by `createSlice` and can be accessed from the slice. `createSlice` uses `createAction` under the hood to produce action creators.  
[Refer to official documentation on createAction usage for detailed usage. &#8594](https://redux-toolkit.js.org/api/createAction)

```ts title="src/redux/slices/counter/index.ts"
...

export const { increase, decrease } = counterSlice.actions;
```

```ts title="src/redux/actions.ts"
export { increase, decrease } from "@redux/slices/counter";
```


### Middleware

Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. Redux middleware can be used for logging, crash reporting, talking to an asynchronous API, routing, and more.

:::info
Redux Toolkit includes `thunk` middleware by default.  
[Refer to official documentation on included default middleware for detailed usage. &#8594](https://redux-toolkit.js.org/api/getDefaultMiddleware#included-default-middleware)
:::

[Refer to official documentation on Redux Middleware for detailed usage. &#8594](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware)  
[Refer to official documentation on Redux Toolkit Middleware for detailed usage. &#8594](https://redux-toolkit.js.org/api/getDefaultMiddleware)

### Adding Redux Toolkit to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

- Install `@reduxjs/toolkit` and `react-redux` packages

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
npm install @reduxjs/toolkit react-redux
```
  </TabItem>
  <TabItem value="yarn">

```bash
yarn add @reduxjs/toolkit react-redux
```          
  </TabItem>
</Tabs>

- [Follow instructions in Configure Store & Setup Reducers and Slices](#configure-store--setup-reducers-and-slices)

[Refer to official documentation on installation for detailed usage. &#8594](https://redux-toolkit.js.org/introduction/quick-start#installation)
