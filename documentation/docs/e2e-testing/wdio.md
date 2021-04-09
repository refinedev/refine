---
id: wdio
title: WebdriverIO
sidebar_label: WebdriverIO
description: Using WebdriverIO with Next.js for End to End testing
---

*Next-gen browser and mobile automation test framework for Node.js.*  
[Refer to official documentation for detailed usage. &#8594](https://webdriver.io/docs/gettingstarted.html)

### Writing Tests

Testing your application will require interacting with UI elements. Best practice for selecting elements in your tests is with special attributes for testing.  

- Add test attributes to elements of your UI.

```tsx title="src/components/main/index.tsx"
import React from "react";
import { Button } from "@components";

export const Main: React.FC = () => {
  return (
    <div>
    // highlight-start
      <h1 data-test="main-heading">superplate</h1>
    // highlight-end
      <p>The frontend boilerplate with superpowers!</p>
    // highlight-start
      <Button data-test="docs-btn-anchor">Docs</Button>
    // highlight-end
    </div>
  );
};
```

- Now these elements can be selected in tests with `$` or `$$`.

```ts
const heading = await $('[data-test="main-heading"]');
```

- Don't forget to visit the page before each test.

```ts title="test/e2e/specs/home.spec.ts"
describe("Homepage", () => {
  beforeEach(async () => {
    await browser.url("/");
  });

  it("Brings header", async () => {
    const heading = await $('[data-test="main-heading"]');
    expect(await heading.getText()).toBe("superplate");
  });

  it("Should have true href", async () => {
    const button = await $('[data-test="docs-btn-anchor"]');
    expect(await button.getTagName()).toBe("a");
    const buttonHref = await button.getAttribute("href");
    expect(buttonHref).toBeTruthy();
    expect(buttonHref).toBe("https://pankod.github.io/superplate/");
  });

  it("Should have icons", async () => {
    const icons = await $$('[data-test="icon"]');
    expect(icons).toHaveLength(6);
  });
});

```

[Refer to official documentation on selecting elemets for detailed usage. &#8594](https://webdriver.io/docs/selectors.html)


### Running Tests

- Configure `baseUrl` option in `wdio.conf.js`.

```js title="wdio.conf.js"
exports.config = {
  ...
  baseUrl: "http://localhost:3000",
  ...
}
```

:::info
If your `url` parameter starts with `/`, the base url gets prepended, not including the path portion of your baseUrl. If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url gets prepended directly.
:::

[Refer to official documentation on configuration for detailed usage. &#8594](https://webdriver.io/docs/configurationfile.html)

- Add a command to run tests.

```json title="package.json"
{
    scripts: {
        "webdriver:run": "wdio wdio.conf.js"
    }
}
```

- Start your project in dev mode

```bash
npm run dev
```

- Run tests with `wdio`

```bash
npm run webdriver:run
```

[Refer to official documentation on command line for detailed usage. &#8594](https://webdriver.io/docs/clioptions.html)

### File structure

WebdriverIO test directory is placed in the root of the project.

- Add `tsconfig.json` for WebdriverIO

```json title="test/e2e/tsconfig.json"
{
  "compilerOptions": {
    "types": ["node", "webdriverio", "@wdio/mocha-framework"]
  },
  "include": ["./specs/**/*.ts"]
}
```

- Don't forget to exclude WebdriveIO from main `tsconfig.json`

```json title="tsconfig.json"
{
  "exclude": ["test/*"]
}
```

:::tip
All this work will be handled automatically by CLI, so you don’t need to do anything extra as long as you choose **WebdriverIO** plugin during the project creation phase.
:::

### Adding WebdriverIO to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

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
npm install -D @wdio/cli 
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add -D @wdio/cli
```
  </TabItem>
</Tabs>

- Generate configuration file

```bash
npx wdio config -y
```

[Refer to official documentation on installation for detailed usage. &#8594](https://webdriver.io/docs/gettingstarted.html)
