---
id: useModal
title: useModal
---

`useModal` hook allows you to manage a modal. It returns the props to manage Ant Design's [`<Modal />`][Modal] components. 

```ts
const { modalProps, show, close } = useModal();
```

You can pass the returned `modalProps` as props to [`<Modal />`][Modal] component and use `show` and `close` methods to hide and show it. It does not provide any functionality besides this.

[Modal]: https://ant.design/components/modal/#API