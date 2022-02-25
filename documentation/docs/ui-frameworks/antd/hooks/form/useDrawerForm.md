---
id: useDrawerForm
title: useDrawerForm
---

import createGif from '@site/static/img/hooks/useDrawerForm/create.gif';
import editGif from '@site/static/img/hooks/useDrawerForm/edit.gif';

`useDrawerForm` hook allows you to manage a form within a Drawer. It returns Ant Design [Form](https://ant.design/components/form/) and [Drawer](https://ant.design/components/drawer/) components props.

```ts
import { useDrawerForm } from "@pankod/refine-antd";

const { drawerProps, formProps } = useDrawerForm<IPost>({
    action: "create", // or "edit"
});
```

All we have to do is to pass the `drawerProps` to `<Drawer>` and `formProps` to `<Form>` components.

## Usage

We'll do two examples, one for creating and one for editing a post. Let's see how `useDrawerForm` is used in both.

### Create Drawer

```tsx  title="pages/posts/list.tsx"
import { useDrawerForm, Drawer, Form, Create, Radio, List, Input } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
// highlight-start
    const {
        formProps,
        drawerProps,
        show,
        saveButtonProps,
    } = useDrawerForm<IPost>({
        action: "create",
    });
// highlight-end

    return (
        <>
            <List
// highlight-start
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
// highlight-end
            >
                ...
            </List>
// highlight-start
            <Drawer {...drawerProps}>
                <Create saveButtonProps={saveButtonProps}>
                    <Form {...formProps} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="published">Published</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Create>
            </Drawer>
// highlight-end
        </>
    )
}

interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
```
<br/>

`createButtonProps` allows us to create and manage a button above the table.

```tsx
    createButtonProps={{
        onClick: () => {
            show();
        },
    }}
```

This code block makes `<Drawer>` appear when you click the button.

`saveButtonProps` allows us to manage the save button in the drawer.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={createGif} alt="Create record action" />
</div>

<br />

### Edit Drawer

Let's learn how to add editing capabilities to the records that will be opening form in Drawer with using `action` prop.

```tsx  title="pages/posts/list.tsx"
import { 
    useDrawerForm,
    Drawer,
    Form,
    Create,
    Radio,
    List,
    Edit,
    Table,
    EditButton,
    Input
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const {
        drawerProps,
        formProps,
        show,
        saveButtonProps,
        deleteButtonProps,
        id,
    } = useDrawerForm<IPost>({
// highlight-next-line
        action: "edit",
    });

    return (
        <>
            <List>
                <Table>
                    ...
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
// highlight-start
                        render={(_value, record) => (
                            <EditButton
                                size="small"
                                recordItemId={record.id}
                                onClick={() => show(record.id)}
                            />
                        )}
// highlight-end
                    />
                </Table>
            </List>
            <Drawer {...drawerProps}>
                <Edit
// highlight-start
                    saveButtonProps={saveButtonProps}
                    deleteButtonProps={deleteButtonProps}
                    recordItemId={id}
// highlight-end
                >
// highlight-next-line
                    <Form {...formProps} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="published">Published</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Edit>
            </Drawer>
        </>
    )
}

interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

:::important
refine doesn't automatically add a edit button to the each record in `<PostList>` which opens edit form in `<Drawer>` when clicking.

So, we have to put the edit buttons on our list. In that way, `<Edit>` form in `<Drawer>` can fetch data by the record `id`.

```tsx
<Table.Column<IPost>
    title="Actions"
    dataIndex="actions"
    key="actions"
    render={(_value, record) => (
        <EditButton
            size="small"
            recordItemId={record.id}
            onClick={() => show(record.id)}
        />
    )}
/>
```

:::

The `saveButtonProps` and `deleteButtonProps` gives us the ability of saving and deleting buttons in the drawer.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={editGif} alt="Edit record action" />
</div>
<br />

## API Parameters

### Properties

| Key                                              | Description                                                                                                                                                                             | Type                                                                           | Default                                                                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| action <div className=" required">Required</div> | Type of form mode                                                                                                                                                                       | `"edit"` \| `"create"`\| `"clone"`                                                         | `"create"`                                                                                                                           |
| autoSubmitClose                                  | Close drawer after submit                                                                                                                                                               | `boolean`                                                                      |                                                                                                                                      |
| form                                             | Ant Design form instance                                                                                                                                                                | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance) |                                                                                                                                      |
| mutationMode                                     | [Determines when mutations are executed](guides-and-concepts/mutation-mode.md). If not explicitly configured, it is read from the mutation mode config of the resource in current route | `"pessimistic"` \| `"optimistic"` \| `"undoable"`                              |                                                                                                                                      |
| onMutationError                                  | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) encounters an error                                                                                      | `(error: TError, variables: TVariables, context: any) => void`                 |                                                                                                                                      |
| onMutationSuccess                                | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) is successful                                                                                            | `(data: TData, variables: TVariables, context: any) => void`                   |                                                                                                                                      |
| redirect                                         | Page to redirect after succesfull mutation                                                                                                                                              | `"show` \| `"edit` \| `"list"`\*\*                                             |                                                                                                                                      |
| submit                                           | Submits the form                                                                                                                                                                        | `(values?: TVariables) => Promise<TData>`                                      |                                                                                                                                      |
| submitOnEnter                                    | Listens `Enter` key press to submit form                                                                                                                                                | `boolean`                                                                      | `false`                                                                                                                              |
| undoableTimeout                                  | Duration to wait before executing mutations when `mutationMode = "undoable"`                                                                                                            | `number`                                                                       | `5000`\*                                                                                                                             |
| warnWhenUnsavedChanges                           | Shows notification when unsaved changes exist                                                                                                                                           | `boolean`                                                                      | `false`\*                                                                                                                            |
| successNotification                              | Successful Mutation notification                                                                                                                                                        | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification)     | "Successfully created `resource`" or "Successfully updated `resource`"                                                               |
| errorNotification                                | Unsuccessful Mutation notification                                                                                                                                                      | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification)     | "There was an error creating `resource` (status code: `statusCode`)" or "Error when updating `resource` (status code: `statusCode`)" |
| metaData                                            | Metadata query for `dataProvider`                                              | [`MetaDataQuery`](/core/interfaces.md#metadataquery)           | {}                                                                   |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook)                                                                                            | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)       | `"off"`                             |
| liveParams                                                                                          | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                     | [`{ ids?: BaseKey[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined`                         |
| onLiveEvent                                                                                         | Callback to handle all related live events of this hook.                                                                                                                                   | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)                           | `undefined`                                  |

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/core/components/refine-config.md)>** component. `useDrawerForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). Otherwise if `action` is `edit`, `redirect`s default value is `list`.

### Return Value

| Key                      | Description                                                  | Type                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show                     | A function that opens the drawer                             | `(id?: BaseKey) => void`                                                                                                                                                               |
| formProps                | Ant Design form props                                        | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                                               |
| drawerProps              | Props for managed drawer                                     | [`DrawerProps`](https://ant.design/components/drawer/#API)                                                                                                                            |
| saveButtonProps          | Props for a submit button                                    | `{ disabled: boolean; onClick: () => void; loading: boolean; }`                                                                                                                       |
| deleteButtonProps        | Adds props for delete button                                 | [`DeleteButtonProps`](/core/interfaces.md#delete-button-props)                                                                                                                        |
| formLoading              | Loading status of form                                       | `boolean`                                                                                                                                                                             |
| submit                   | Submit method, the parameter is the value of the form fields | `() => void`                                                                                                                                                                          |
| visible                  | Whether the drawer is visible or not                         | `boolean`                                                                                                                                                                             |
| close                    | Specify a function that can close the drawer                 | `() => void`                                                                                                                                                                          |
| defaultFormValuesLoading | DefaultFormValues loading status of form                     | `boolean`                                                                                                                                                                             |
| form                     | Ant Design form instance                                     | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)                                                                                                        |
| id                   | Record id for edit action                                    | `string`                                                                                                                                                                              |
| setId                | `id` setter                                              | `Dispatch<SetStateAction<` `string` \| `undefined>>`                                                                                                                                  |
| queryResult              | Result of the query of a record                              | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery)                                                                                         |
| mutationResult           | Result of the mutation triggered by submitting the form      | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; values: TVariables; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]        | [`HttpError`][httperror]   |
| TVariables | Values for params.                                               | `{}`                       |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-use-drawer-form-example-hby1l?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-drawer-form-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

[BaseRecord]: /core/interfaces.md#baserecord
[HttpError]: /core/interfaces.md#httperror