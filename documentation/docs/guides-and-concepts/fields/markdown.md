---
id: markdown
title: Markdown
---

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

## Usage

Let's see how to use `<MarkdownField>` in a show page:

```tsx
import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    //highlight-next-line
    MarkdownField,
} from "@pankod/refine";

import { IPost } from "interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = (props) => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show {...props} isLoading={isLoading}>
            {record && (
                <>
                    <Title level={5}>Id</Title>
                    <Text>{record.id}</Text>

                    <Title level={5}>Content</Title>
                    //highlight-next-line
                    <MarkdownField value={record.content} />
                </>
            )}
        </Show>
    );
};
```

## API Reference

### Properties

| Property | Description             | Type     |
| -------- | ----------------------- | -------- |
| value    | Markdown data to render | `string` |
