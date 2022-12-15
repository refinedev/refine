---
id: number
title: Number
swizzle: true
---


This field is used to display a number formatted according to the browser locale, right aligned. and uses [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) to display date format.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

`<NumberField>` uses Intl.NumberFormat() if available, passing the locales and options props as arguments. This allows a perfect display of decimals, currencies, percentages, etc. See [Intl.NumberFormat documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for the options prop syntax.

If Intl is not available, `<NumberField>` outputs numbers as is (and ignores the locales and options props).

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    // highlight-next-line
    NumberField,
    List,
} from "@pankod/refine-mui";

export const PageList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>({
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
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Hit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="center">
                                // highlight-start
                                <NumberField
                                    value={row.hit}
                                    options={{
                                        notation: "compact",
                                    }}
                                    // highlight-end
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
    hit: number;
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/number/numberFieldMui.png" alt="NumberField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/NumberField" value-description="Number value" />

:::tip External Props
It also accepts all props of Material UI [Text](https://mui.com/material-ui/react-text-field/).
:::