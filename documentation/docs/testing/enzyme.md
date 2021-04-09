---
id: enzyme
title: Enzyme
sidebar_label: Enzyme
description: Setting up Jest and Enzyme for Typescript Next.js apps 
---

[Enzyme](https://enzymejs.github.io/enzyme/) is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.

**superplate**'s plugin of Enzyme is built on top of [superplate's Jest plugin](jest) and automatically includes necessary wrappers and imports to run your component tests.

## Implementation

You can see how **superplate**'s Enzyme plugin is implemented below.

:::tip

Configuration for Jest is not included. Please check out [Jest Plugin](jest) to learn more about our Jest configuration.

:::


:::warning

Currently, Enzyme is not fully supporting React 17. We will be using [@wojtekmaj/enzyme-adapter-react-17](https://github.com/wojtekmaj/enzyme-adapter-react-17) as an adapter for React 17 for compatibility.

:::

### Jest Setup

We need to configure Enzyme with React 17 Adapter in our `jest.setup.js` file. We can do this with following code;

```js title="test/jest.setup.js"
import "isomorphic-unfetch";
import nock from "nock";
import dotenv from "dotenv";
// highlight-next-line
import Enzyme from "enzyme";
// highlight-next-line
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

dotenv.config({ path: ".env.test" });

// highlight-next-line
Enzyme.configure({ adapter: new Adapter() });
    
afterAll(() => {
    nock.cleanAll();
    nock.restore();
});
```

### Custom Mount

We may need to wrap our test components to context providers, data stores etc. It's a good practice to make this wrappers globally available. We will create a custom mount function in `test/mount.tsx` file. 

```tsx title="test/mount.tsx"
import React, { ReactNode } from "react";
import { mount as mountBase, MountRendererProps, ReactWrapper } from "enzyme";
/*
import { ThemeProvider } from 'my-ui-lib'
import { TranslationProvider } from 'my-i18n-lib'
*/

export const AllTheProviders = ({ children }) => {
    return (
        // <ThemeProvider theme="light">
        //     <TranslationProvider>
                {children}
        //     </TranslationProvider>
        // </ThemeProvider>
    );
};


const mount: (node: ReactNode, options?: MountRendererProps) => ReactWrapper = (
    node,
    options,
) => {
    return mountBase(<AllTheProviders>{node}</AllTheProviders>, options);
};

// override render method
export default mount;
```

### Example Test

```ts title="components/myComponent/index.spec.tsx"
// highlight-next-line
import mount from "@test/mount"; // <root>/test/mount.tsx
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
    it("button is clickable", () => {
        const mockFn = jest.fn();
        // highlight-next-line
        const wrapper = mount(<MyComponent onClick={mockFn} />);

        const btn = wrapper.find("button");
        btn.simulate("click");

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
```

```tsx title="components/myComponent/index.tsx"
import React from "react";

export const MyComponent: React.FC<{ onClick: () => void }> = ({
    onClick,
}) => {
    return (
        <div>
            <button onClick={onClick}>
                Click Me!
            </button>
        </div>
    );
};
```

### Running Tests

We will use Jest as our test runner. If Jest is already set up you can simply run

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run test
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn test
```
  </TabItem>
</Tabs>

## Adding Enzyme to your project later


:::tip

All this work will be handled automatically by superplate, so you don’t need to do anything extra as long as you choose Enzyme as testing plugin during the project creation phase.

:::

If you want to add Enzyme to your existing project first install the dependencies


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm install -D enzyme @types/enzyme @wojtekmaj/enzyme-adapter-react-17
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add -D enzyme @types/enzyme @wojtekmaj/enzyme-adapter-react-17
```
  </TabItem>
</Tabs>

Then you can follow documentations for detail usage

- Enzyme [documentation](https://enzymejs.github.io/enzyme/)
- Jest setup from **superplate** [documentation](jest)