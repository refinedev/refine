---
id: useModalForm
title: useModalForm
---

`useModalForm` allows you to create a modal form. It provides some useful methods to handle the form modal.

:::info
`useModalForm` hook is extended from [`useForm`][refine-react-hook-form-use-form] from the [`@pankod/refine-react-hook-form`][@pankod/refine-react-hook-form] package.
:::

## Usage

### List Page

### Edit Page

### Create Page

## API Reference

### Properties

| Property                   | Description                                                         | Type                                                |
| -------------------------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| modalProps                 | Configuration object for the modal                                  | [`ModalPropsType`](#modalpropstype)                 |
| refineCoreProps            | Configuration object for the core of the [`useForm`][use-form-core] | [`UseFormProps`](/core/hooks/useForm.md#properties) |
| React Hook Form Properties | See [React Hook Form][react-hook-form-use-form] documentation       |

<br />

> -   #### ModalPropsType
>
> | Property        | Description                                                   | Type      | Default |
> | --------------- | ------------------------------------------------------------- | --------- | ------- |
> | defaultVisible  | Initial visibility state of the modal                         | `boolean` | `false` |
> | autoSubmitClose | Whether the form should be submitted when the modal is closed | `boolean` | `true`  |
> | autoResetForm   | Whether the form should be reset when the form is submitted   | `boolean` | `true`  |

### Return values

| Property                      | Description                                                     | Type                                                          |
| ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| modal                         | Relevant states and methods to control the modal                | [`ModalReturnValues`](#modalreturnvalues)                     |
| refineCore                    | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/hooks/useForm.md#return-values) |
| React Hook Form Return Values | See [React Hook Form][react-hook-form-use-form] documentation   |

<br />

> -   #### ModalReturnValues
>
> | Property        | Description                                    | Type                                         |
> | --------------- | ---------------------------------------------- | -------------------------------------------- |
> | visible         | State of modal visibility                      | `boolean`                                    |
> | show            | Sets the visible state to true                 | `(id?: BaseKey) => void`                     |
> | close           | Sets the visible state to false                | `() => void`                                 |
> | submit          | Submits the form                               | `(values: TVariables) => void`               |
> | title           | Modal title based on resource and action value | `string`                                     |
> | saveButtonProps | Props for a submit button                      | `{ disabled: boolean, onClick: () => void }` |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/github/pankod/refine/tree/master/examples/reactHookForm/useModalForm?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-react-hook-form-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[@pankod/refine-react-hook-form]: https://github.com/pankod/refine/tree/master/packages/react-hook-form
[refine-react-hook-form-use-form]: /packages/react-hook-form/useForm.md
[react-hook-form-use-form]: https://react-hook-form.com/api/useform
[use-form-core]: /core/hooks/useForm.md
