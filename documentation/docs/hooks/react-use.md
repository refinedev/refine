---
id: react-use
title: React Use
sidebar_label: React Use
description: How to use react hooks with Next.js?
---
  
react-use has various hooks that you can use with ease.

Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.

[Refer to official documentation for detailed usage. &#8594](https://github.com/streamich/react-use)

### react-use

In this example, we'll use `useWindowSize` and  `usePrevious` hooks in order to  tracks `Window` dimensions and get the previous state with ease.

```js
import React from "react";
// highlight-next-line
import { usePrevious, useWindowSize } from "react-use";

export const ReactUseExample = () => {
    const [count, setCount] = React.useState(0);
    // highlight-start
    const prevCount = usePrevious(count);
    const { width, height } = useWindowSize();
     // highlight-end

    return (
        <div>
            <div>
                <p>usePrevious</p>
                <p>
                    Now: {count}, before: {prevCount}
                </p>
                <p>
                    <button onClick={() => setCount(count + 1)}>
                        Increment
                    </button>
                    <button onClick={() => setCount(count - 1)}>
                        Decrement
                    </button>
                </p>
            </div>
            <div>
                <p>useWindowSize</p>
                <p>
                    width: {`${width}px`}, height: {`${height}px`}
                </p>
            </div>
        </div>
    );
};
```


## Adding react-use to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

- Install `react-use` package.

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
npm install react-use
```

  </TabItem>
  <TabItem value="yarn">

```bash
yarn add react-use
```

  </TabItem>
</Tabs>