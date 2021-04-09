---
id: jest
title: Jest
sidebar_label: Jest
description: Setting up Jest and Enzyme for Typescript Next.js apps 
---

[Jest](https://jestjs.io/docs/en/getting-started) is a delightful JavaScript Testing Framework with a focus on simplicity.

**superplate** serving optional Jest testing plugin which uses `ts-jest` under the hood and comes with `nock` and `isomorphic-unfetch`.

- `ts-jest` is a TypeScript preprocessor for Jest to test projects written in TypeScript.  
[Refer to official documentation for detailed usage. &#8594](https://kulshekhar.github.io/ts-jest/)
- `nock` is a HTTP server mocking library. We use it to mock requests in our tests.  
[Refer to official documentation for detailed usage. &#8594](https://github.com/nock/nock#nock)
- While Next.js comes with a built-in polyfill for `fetch`; We still need to add one for our Jest environment.

## Implementation

You can see how **superplate**'s Jest plugin is implemented below.


### `jest.config.js`

We need to configure Jest to work with our environment. We'll be doing this in `test/jest.config.js` with the following code;

```js title="test/jest.config.js"
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("../tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

module.exports = {
    rootDir: "../",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
        "\\.(scss|sass|css)$": "identity-obj-proxy",
    },
};
```
What we basically do is;

- Specifying a root directory for tests
- Path to our Setup configuration for the testing environment
- Mapping our `tsconfig` paths to jest
- Mocking styles to prevent Jest to throw an error 

### `jest.setup.js`

We need to apply the polyfill for the `fetch`, set environment variables to use in tests and setup `nock` to prevent memory leaks. We'll place this setup in `test/jest.setup.js` with the following code;

```js title="test/jest.setup.js"
import "isomorphic-unfetch";
import nock from "nock";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

afterAll(() => {
    nock.cleanAll();
    nock.restore();
});
```

### Running Tests

We need to specify our config file when running jest, we can do this with `jest -c test/jest.config.js`. We will add this command to `package.json` as a test script. 

```json title="package.json"
{
    "scripts": {
        "test": "jest -c test/jest.config.js"
    },
}
```

### Example Test

```ts title="add.ts"
// This is an example function to test
export const const add = (...nums: number[]) => {
  return nums.reduce((acc, curr) =>  acc + curr, 0);
}
```

```ts title="add.spec.ts"
import { add } from "./add";

describe("Add Function", () => {
  it("1 + 2 + 3 = 6", () => {
    expect(add(1,2,3)).toEqual(6);
  });
});
```

## Adding Jest to your project later

:::tip

All this work will be handled automatically by superplate, so you don’t need to do anything extra as long as you choose Jest as testing plugin during the project creation phase.

:::

If you want to add Jest to your existing project first install dependencies: 


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
npm i -D jest ts-jest identity-obj-proxy nock isomorphic-unfetch dotenv 
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add -D jest ts-jest identity-obj-proxy nock isomorphic-unfetch dotenv
```
  </TabItem>
</Tabs>

Then you can follow documentations for detail usage

- Jest's [documentation](https://jestjs.io/docs/en/getting-started)
- ts-jest's [documentation](https://kulshekhar.github.io/ts-jest/docs/installation)
- Next.js and Jest [example repository](https://github.com/vercel/next.js/tree/canary/examples/with-jest)