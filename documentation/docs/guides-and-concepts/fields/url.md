---
id: url
title: Url
---

This field lets you embed a link. It uses [Ant Design's <Typography.Link\>](https://ant.design/components/typography/) component. You can pass a url in its `value` prop. And you can show a text in its place by passing any `children`.

## Usage

Let's see how to use `<UrlField>` with an example:

```tsx
import * as React from "react";
import {
    List,
    Table,
    //highlight-next-line
    UrlField,
    useTranslate,
    useTable,
    IResourceComponentsProps,
} from "@pankod/refine";

export const FilesList: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        initialPageSize: 20,
    });
    return (
        <List {...props}>
            <Table
                {...tableProps}
                pagination={{
                    ...tableProps.pagination,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.files.fields.id")}
                />
                //highlight-start
                <Table.Column
                    key="url"
                    dataIndex="url"
                    title="Test UrlField"
                    render={(value) => {
                        return (
                            <UrlField
                                value={value}
                                target="_blank"
                                title="test title"
                            />
                        );
                    }}
                />
                //highlight-end
            </Table>
        </List>
    );
};
```

## API Reference

### Properties

| Property | Description                  | Type         |
| -------- | ---------------------------- | ------------ |
| value    | Url for link to reference to | `string`     |
| children | What to show instead of url  | `ReactNode|` |
