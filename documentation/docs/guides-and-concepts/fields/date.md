---
id: date
title: Date
---

import dateField from '@site/static/img/guides-and-concepts/fields/date/dateField.png'

This field is used to display dates and uses [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

## Usage

Let's see how to use `<DateField>` with the example in the post list.

```tsx
//highlight-next-line
import { List, Table, DateField } from "@pankod/refine";

export const PostList: React.FC = () => {
    interface IPost {
        id: string;
        createdAt: string;
    }

    return (
        <List>
            <Table key="id">
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

<br/>
<div>
    <img src={dateField} alt="DateField Usage"/>
</div>

## API Reference

### Properties

| Property                                            | Description                                                         | Type                                            | Default |
| --------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------- | ------- |
| value <div className="required">Required</div>      | Date value                                                          | `string` \| `number` \| `Date` \| `dayjs.Dayjs` |         |
| [format](https://day.js.org/docs/en/display/format) | Get the formatted date according to the string of tokens passed in. | `string` \| `undefined`                         | `"L"`   |
