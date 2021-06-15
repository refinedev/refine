---
id: email
title: Email
---

import emailField from '@site/static/img/guides-and-concepts/fields/email/emailfield.png'

This field is used to display email values and uses [`<Link>`](https://ant.design/components/typography/#FAQ) in `<Typography>` from Ant Design.

[Refer to `<Typography>` documentation for detailed usage. &#8594](https://ant.design/components/typography)

## Usage

Let's see how to use `<EmailField>` with the example in the user list.

```tsx
import { List, Table, EmailField } from "@pankod/refine";

export const UserList: React.FC = () => {

    return (
        <List>
            <Table key="id">
                //highlight-next-line
                ...
                 <Table.Column
                        key="email"
                        dataIndex="email"
                        title="Email"
                        render={(value) => 
                        //highlight-next-line
                        <EmailField value={value} />}
                    />
            </Table>
        </List>
    );
};
```
:::tip
`<EmailField>` uses "mailto" in the href prop of the `<Link>` component. For this reason, clicking `<EmailField>` opens your device's default mail application.
:::

<br/>
<div>
    <img src={emailField} alt="Aside Usage"/>
</div>


## API Reference

### Properties

| Property | Description | Type              | Default |
| -------- | ----------- | ----------------- | ------- |
| value    | Email value | `React.ReactNode` |         |


[Refer to rest Link props &#8594](https://ant.design/components/typography/#API)

