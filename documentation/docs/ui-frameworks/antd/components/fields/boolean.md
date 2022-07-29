---
id: boolean
title: Boolean
---

import booleanField from '@site/static/img/guides-and-concepts/fields/boolean/booleanfield.png'

This field is used to display boolean values. It uses the [`<Tooltip>`](https://ant.design/components/tooltip/#header) values from Ant Design.

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list.

```tsx
import { 
    List,
    Table,
    // highlight-start
    BooleanField,
    Icons
    // highlight-end
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    // highlight-next-line
    const { CloseCircleOutlined, CheckCircleOutlined } = Icons;

    return (
        <List>
            <Table rowKey="id">
                ...
                <Table.Column
                    dataIndex="status"
                    title="Published"
                    render={(value) => (
                        // highlight-start
                        <BooleanField
                            value={value === "published"}
                            trueIcon={<CheckCircleOutlined />}
                            falseIcon={<CloseCircleOutlined />}
                            valueLabelTrue="published"
                            valueLabelFalse="unpublished"
                        />
                        // highlight-end
                    )}
                />
            </Table>
        </List>
    );
};
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={booleanField} alt="BooleanField" />
</div>

## API Reference

### Properties

| Property             | Description                                  | Type                                                                 | Default                                                    |
| -------------------- | -------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| value                | Field value                                  | `unknown`                                                            |                                                            |
| valueLabelTrue       | If there is a value, this is the text to use | `string`                                                             | `"true"`                                                   |
| valueLabelFalse      | If there no value, this is the text to use   | `string`                                                             | `"false"`                                                  |
| trueIcon             | If there is a value, this is the icon to use | `React.ReactNode`                                                    | [`<CheckOutlined />`](https://ant.design/components/icon/) |
| falseIcon            | If there no value, this is the icon to use.  | `React.ReactNode`                                                    | [`<CloseOutlined />`](https://ant.design/components/icon/) |
| AbstractTooltipProps | Ant Design `Tooltip` properties              | [`AbstractTooltipProps`](https://ant.design/components/tooltip/#API) |                                                            |
