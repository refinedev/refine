---
id: date
title: Date
---

import dateField from '@site/static/img/guides-and-concepts/fields/date/dateField.png'

This field is used to display dates. It uses [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

## Usage

Let's see how we can use `<DateField>` with the example in the post list.

```tsx twoslash {3, 16}
import { 
    List,
    Table,
    DateField 
} from "@pankod/refine";

export const PostList: React.FC = () => {

    return (
        <List>
            <Table rowKey="id">
                ...
                <Table.Column<IPost>
                    dataIndex="createdAt"
                    title="Created At"
                    render={(value) => (
                        <DateField format="LLL" value={value} />
                    )}
                />
                ...
            </Table>
        </List>
    );
};

interface IPost {   
    id: string;    
    createdAt: string;
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={dateField} alt="DateField" />
</div>

## API Reference

### Properties

| Property                                                                                         | Description                                                              | Type                                            | Default |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------- | ------- |
| <div className="required-block"><div>value</div> <div className=" required">Required</div></div> | Date value                                                               | `string` \| `number` \| `Date` \| `dayjs.Dayjs` |         |
| [format](https://day.js.org/docs/en/display/format)                                              | Gets the formatted date according to the string of the tokens passed in. | `string` \| `undefined`                         | `"L"`   |
