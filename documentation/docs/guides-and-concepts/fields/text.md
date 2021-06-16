---
id: text
title: Text
---

This field lets you show basic text. It uses Ant Design's [<Typography.Text\>](https://ant.design/components/typography/#Typography.Text) component.

## Usage

Let's see how to use it in a basic show page:

```tsx title="src/pages/posts/show.tsx"
import * as React from "react";

//highlight-next-line
import { Show, TextField, useShow, Typography } from "@pankod/refine";

const { Title } = Typography;

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            //highlight-next-line
            <TextField value={record?.id} />

            <Title level={5}>Title</Title>
            //highlight-next-line
            <TextField value={record?.title} />
        </Show>
    );
};
```

```ts title="src/interfaces/index.d.ts"
interface IPost {
    id: string;
    title: string;
}
```

## API Reference

### Properties

It accepts all [`Typography.Text`](https://ant.design/components/typography/#Typography.Text) props and:

| Property | Description             | Type                 |
| -------- | ----------------------- | -------------------- |
| value    | Markdown data to render | `string | undefined` |
