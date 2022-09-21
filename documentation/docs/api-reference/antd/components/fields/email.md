---
id: email
title: Email
---

import emailField from '@site/static/img/guides-and-concepts/fields/email/emailField.png'

This field is used to display email values. It uses the [`<Link>`](https://ant.design/components/typography/#FAQ) component of [`<Typography>`](https://ant.design/components/typography) from Ant Design.

## Usage

Let's see how we can use `<EmailField>` with the example in the user list.

```tsx
import { 
    List,
    Table,
    // highlight-next-line
    EmailField
} from "@pankod/refine-antd";

export const UserList: React.FC = () => {

    return (
        <List>
            <Table rowKey="id">
                ...
                 <Table.Column
                    dataIndex="email"
                    title="Email"
                    // highlight-next-line
                    render={(value: string) => <EmailField value={value} />}
                />
                ...
            </Table>
        </List>
    );
};
```
:::tip
`<EmailField>` uses "mailto:" in the href prop of the `<Link>` component. For this reason, clicking `<EmailField>` opens your device's default mail application.
:::

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={emailField} alt="EmailField" />
</div>

## API Reference

### Properties

| Property | Description | Type              | Default |
| -------- | ----------- | ----------------- | ------- |
| value    | Email value | `React.ReactNode` |         |


[Refer to the documentation for the rest of Link properties. &#8594](https://ant.design/components/typography/#API)
