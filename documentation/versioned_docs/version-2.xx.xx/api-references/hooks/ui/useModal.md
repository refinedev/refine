---
id: useModal
title: useModal
---


`useModal` hook allows you to manage a modal. It returns the props to manage Ant Design's [Modal][Modal] components. 

```ts
const { modalProps, show, close } = useModal();
```

You can pass the returned `modalProps` as props to [Modal][Modal] component and use `show` and `close` methods to hide and show it. It does not provide any functionality besides this. You can use this hook anywhere.

## Usage

Let's see an example:

```tsx  title="src/pages/posts/list.tsx"
import {
    List,
    Table,
    useTable,
// highlight-start
    useModal,
    Modal,
// highlight-end
    Button,
} from "@pankod/refine";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

// highlight-next-line
    const { modalProps, show, close } = useModal();

    return (
        <>
            <List
                pageHeaderProps={{
                    extra: <Button onClick={show}>Show Dummy Modal</Button>,
                }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column dataIndex="content" title="Content" />
                </Table>
            </List>
// highlight-start
            <Modal onOk={close} {...modalProps}>
                Dummy Modal Content
            </Modal>
// highlight-end
        </>
    );
};

interface IPost {
    id: string;
    title: string;
    content: string;
}
```

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/hooks/useModal/useModal.gif" alt="use modal usage" />
</div>

<br />

Here, we show a button somewhere on the page and use `show` on it's `onClick` callback to trigger opening of the modal below the `<List>` component. When the user clicks on the button, the modal appears.

We also used `onOk` callback from Ant Design [Modal][Modal] to add `close` as a callback on it's button. When the user clicks on this button, thus triggering `close` function, the modal dialog will be closed. We do this to demonstrate `close` function.

## API Reference

### Return Value

| Key        | Description                                 | Type                  |
| ---------- | ------------------------------------------- | --------------------- |
| modalProps | Props for managed modal                     | [`ModalProps`][Modal] |
| show       | A function that can open the modal          | `() => void`          |
| close      | Specify a function that can close the modal | `() => void`          |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-use-modal-example-ghdhl?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-use-modal-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[Modal]: https://ant.design/components/modal/#API