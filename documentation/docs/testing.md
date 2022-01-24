---
id: testing
title: Testing
---

**refine**'s components and hooks are made from small pieces of code. Each component or hook is designed to be testable and work independently of each other.

So, you don't need unit testing, because **refine** is already tested by its maintainers. However, you can write unit tests in your own code (helper, definitions, etc.).

We strongly recommend that you write end-to-end tests of your application. **refine** used the [cypress](https://www.cypress.io/) framework as an example. You are free to write tests with any framework you want.

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-e2e-testing-bg3xt?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-e2e-testing"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
