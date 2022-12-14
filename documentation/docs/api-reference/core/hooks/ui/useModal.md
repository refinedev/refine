---
id: useModal
title: useModal
---

`useModal` hook allows you to manage a modal. Since it is designed as headless, it only outputs `show` and `close` functions and `visible` for state. It expects you to handle the UI.

```ts
const { show, close, visible } = useModal();
```

You can use `visible` state to show or hide the modal. The `show` and `close` functions allow to change the `visible` state. It does not provide any functionality besides this. You can use this hook anywhere.

## Usage

Let's see an example:

```tsx title="src/pages/posts/list.tsx"
import {
    // highlight-next-line
    useModal,
} from "@pankod/refine-core";

export const PostList: React.FC = () => {
    // highlight-next-line
    const { visible, show, close } = useModal();

    return (
        <>
            // highlight-start
            <button onClick={show}>Show Modal</button>
            {visible && (
                <YourModalComponent>
                    <p>Dummy Modal Content</p>
                    <button onClick={close}>Close Modal</button>
                </YourModalComponent>
            )}
            // highlight-end
        </>
    );
};
```

<br />

Here, we show a button somewhere on the page and use `show` on it's `onClick` callback to trigger opening of the `<YourModalComponent>`. When the user clicks on the button, the `<YourModalComponent>` appears.

We also created a `<button>` to close the `<YourModalComponent>` and gave the onClick function `close`, the modal dialog will be closed. We do this to demonstrate `close` function.

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useModal"  />

### Return Value

| Key     | Description                                 | Type         |
| ------- | ------------------------------------------- | ------------ |
| visible | Returns the `visible` state of the Modal    | `boolean`    |
| show    | A function that can open the modal          | `() => void` |
| close   | Specify a function that can close the modal | `() => void` |

## Example

<StackblitzExample path="core-use-modal" />

[modal]: https://ant.design/components/modal/#API
