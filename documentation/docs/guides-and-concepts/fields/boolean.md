---
id: boolean
title: Boolean
---

import booleanField from '@site/static/img/guides-and-concepts/fields/boolean/booleanfield.png'

This field is used to display boolean values and uses tooltip values from ant-design.

[Refer to `<Tooltip>` documentation for detailed usage. &#8594](https://ant.design/components/tooltip/#header)

# Usage

Let's see how to use `BooleanField` with the example in the post list.

```tsx
import { List, Table, BooleanField, Icons } from "@pankod/refine";

export const PostList: React.FC = (props) => {
    const { CloseCircleOutlined, CheckCircleOutlined } = Icons;

    return (
        <List {...props}>
            <Table key="id">
                //highlight-next-line
                ...
                <Table.Column
                    dataIndex="status"
                    title="Published"
                    key="isPublished"
                    render={(value) => (
                        //highlight-start
                        <BooleanField
                            value={value === "published"}
                            trueIcon={<CheckCircleOutlined />}
                            falseIcon={<CloseCircleOutlined />}
                            valueLabelTrue="published"
                            valueLabelFalse="unpublished"
                        />
                        //highlight-end
                    )}
                />
            </Table>
        </List>
    );
};
```

<br/>
<div>
    <img src={booleanField} alt="Aside Usage"/>
</div>


## API Reference

### Properties

| Property             | Description                                | Type                                                                 | Default                                                    |
| -------------------- | ------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| value                | Field value                                | `unknown`                                                            |                                                            |
| valueLabelTrue       | If there is a value, it is the text to use | `string`                                                             | `"true"`                                                   |
| valueLabelFalse      | If there no value, it is the text to use   | `string`                                                             | `"false"`                                                  |
| trueIcon             | If there is a value, it is the icon to use | `React.FC | object`                                                  | [`<CheckOutlined />`](https://ant.design/components/icon/) |
| falseIcon            | If there no value, it is the icon to use.  | `React.FC | object`                                                  | [`<CloseOutlined />`](https://ant.design/components/icon/) |
| AbstractTooltipProps | ant-design `Tooltip` props                 | [`AbstractTooltipProps`](https://ant.design/components/tooltip/#API) |                                                            |
