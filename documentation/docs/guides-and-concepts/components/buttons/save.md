---
id: save-button
title: Save
---

import defaultUsage from '@site/static/img/guides-and-concepts/components/buttons/save/default.png';

`<SaveButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It can be useful when you need to submit your form.

## Usage

```tsx
import { SaveButton } from "@pankod/refine";

export const MySaveComponent = () => {
    return <SaveButton />;
};
```

Looks like this:

<div>
    <img  width="20%" src={defaultUsage} alt="Default Save Button" />
</div>
<br/>

:::tip
It can be useful when used with `saveButtonProps` property from form hooks.
:::

## API Reference

### Properties

| Property | Description                      | Type                                                       | Default                                                   |
| -------- | -------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| props    | Ant Design button props          | [`ButtonProps`](https://ant.design/components/button/#API) |                                                           |
| children | Set the button text              | `ReactNode`                                                | `"Save"`                                                  |
| type     | Set the button type              | `string`                                                   | `"primary"`                                               |
| icon     | Set the icon component of button | `ReactNode`                                                | [`<SaveOutlined />`](https://ant.design/components/icon/) |
