---
id: email
title: Email
swizzle: true
---


This field is used to display email values. It uses the [`<Link>`](https://ant.design/components/typography/#FAQ) component of [`<Typography>`](https://ant.design/components/typography) from Ant Design.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/email/emailField.png" alt="EmailField" />
</div>

## API Reference

<PropsTable module="@pankod/refine-antd/EmailField" />

:::tip External Props
It also accepts all props of Ant Design [Link](https://ant.design/components/typography/#How-to-use-Typography.Link-in-react-router).
:::

[Refer to the documentation for the rest of Link properties. &#8594](https://ant.design/components/typography/#API)
