---
id: email
title: Email
---

import emailField from '@site/static/img/guides-and-concepts/fields/email/emailFieldMui.png'

This field is used to display email values. It uses the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component of [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) from Material UI.

## Usage

Let's see how we can use `<EmailField>` with the example in the user list.

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    List,
    // highlight-next-line
    EmailField,
} from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IUser>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
    });

    const { data } = tableQueryResult;

    return (
        <List>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.firstName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.lastName}
                            </TableCell>
                            <TableCell>
                                // highlight-next-line
                                <EmailField value={row.email} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </List>
    );
};

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}
```

:::tip
`<EmailField>` uses "mailto:" in the href prop of the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component. For this reason, clicking `<EmailField>` opens your device's default mail application.
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

[Refer to the documentation for the rest of Link properties. &#8594](https://mui.com/material-ui/react-link/#main-content)
