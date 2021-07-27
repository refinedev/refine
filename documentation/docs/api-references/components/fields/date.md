---
id: date
title: Date
---

import dateField from '@site/static/img/guides-and-concepts/fields/date/dateField.png'

This field is used to display dates. It uses [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

## Usage

Let's see how we can use `<DateField>` with the example in the post list.

```tsx
//highlight-next-line
import { List, Table, DateField } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {

    return (
        <List>
            <Table rowKey="id">
                //highlight-next-line ...
                <Table.Column<IPost>
                    dataIndex="createdAt"
                    title="Created At"
                    key="createdAt"
                    render={(value) => (
                        //highlight-next-line
                        <DateField format="LLL" value={value} />
                    )}
                />
            </Table>
        </List>
    );
};
```

```ts title="interfaces/index.d.ts"
export interface IPost {   
    id: string;    
    createdAt: string;
}
```

<br/>
<div>
    <img src={dateField} alt="DateField Usage"/>
</div>

## API Reference

### Properties

| Property                                            | Description                                                         | Type                                            | Default |
| --------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------- | ------- |
| value   <div className="required">Required</div>    | Date value                                                          | `string` \| `number` \| `Date` \| `dayjs.Dayjs` |         |
| [format](https://day.js.org/docs/en/display/format) | Gets the formatted date according to the string of the tokens passed in. | `string` \| `undefined`                         | `"L"`   |
