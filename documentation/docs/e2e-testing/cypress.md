---
id: cypress
title: Cypress
sidebar_label: Cypress
description: Using Cypress with Next.js for End to End testing
---

*Fast, easy and reliable testing for anything that runs in a browser.*

Cypress is a next generation front end testing tool built for the modern web. It addresses the key pain points developers and QA engineers face when testing modern applications.  
[Refer to official documentation for detailed usage. &#8594](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell)

### Writing Tests

Testing your application will require interacting with UI elements. Best practice for selecting elements in your tests is with special attributes for testing.  
[Refer to official documentation on writing tests for detailed usage. &#8594](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html)

- Add test attributes to elements of your UI.

```tsx title="components/main/index.tsx"
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

- Now these elements can be selected in tests with `cy.get`

```ts
cy.get(`[data-test=main-heading]`);
```

- Add two custom commands from [Real World App (RWA)](https://github.com/cypress-io/cypress-realworld-app/blob/develop/cypress/support/commands.ts#L28) for easier selection of elements.

```ts title="cypress/support/commands.ts"
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});
```

- Don't forget to visit the page before each test.

```ts title="cypress/integration/home.spec.ts"
describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Brings header", () => {
    cy.getBySel("main-heading").should("contain.text", "superplate");
  });

  it("Should have true href", () => {
    // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__tab-handling-links/cypress/integration/tab_handling_anchor_links_spec.js
    cy.getBySel("docs-btn-anchor")
      .should("have.prop", "href")
      .and("equal", "https://pankod.github.io/superplate/");
  });
});
```

[Refer to official documentation on selecting elemets for detailed usage. &#8594](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements)


### Running Tests

- Add `baseUrl` option to cypress configuration.

```json title="cypress.json"
{
  "baseUrl": "http://localhost:3000"
}
```

:::info
 This will automatically prefix `cy.visit()` and `cy.request()` commands with this `baseUrl`.
:::

[Refer to official documentation on configuration for detailed usage. &#8594](https://docs.cypress.io/guides/references/configuration.html)

- Add commands for opening Cypress Test Runner and running tests.

```json title="package.json"
{
    scripts: {
        "cypress:open": "cypress open",
        "cypress:run": "cypress run --config video=false",
        "cypress:test": "start-server-and-test start http://localhost:3000 cypress:run"
    }
}
```

#### Testing in development

- Start your project in dev mode

```bash
npm run dev
```

- Run tests headlessly with `cypress run`

```bash
npm run cypress:run
```

#### Testing with production bundle

- Build your project

```bash
npm run build
```

- run tests

```bash
npm run cypress:test
```

:::info
`cypress run` runs tests to completion. By default, `cypress run` will run all tests headlessly in the Electron browser.

`cypress open` opens the test runner and lets you run your tests invidually.
:::

[Refer to official documentation on command line for detailed usage. &#8594](https://docs.cypress.io/guides/guides/command-line.html)

### File structure

Cypress directory is placed in the root of the project.

- Add `tsconfig.json` for Cypress

```json title="cypress/tsconfig.json"
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress"]
  },
  "include": ["**/*.ts"]
}
```

- Don't forget to exclude Cypress from main `tsconfig.json`

```json title="tsconfig.json"
{
  "exclude": ["cypress/*"]
}
```

:::tip
All this work will be handled automatically by CLI, so you don’t need to do anything extra as long as you choose **Cypress** plugin during the project creation phase.
:::

### Adding Cypress to your project later

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
npm install -D cypress 
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add -D cypress
```
  </TabItem>
</Tabs>



- Follow instructions starting in [Writing Tests](#writing-tests)

[Refer to official documentation on installation for detailed usage. &#8594](https://docs.cypress.io/guides/getting-started/installing-cypress.html)
