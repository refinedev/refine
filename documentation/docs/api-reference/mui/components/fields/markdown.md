---
id: markdown
title: Markdown
swizzle: true
---


This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx title="pages/posts/show.tsx"
import { useShow } from "@pankod/refine-core";
import {
    Show,
    Typography,
    // highlight-next-line
    MarkdownField,
} from "@pankod/refine-mui";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Typography>Id</Typography>
            <Typography>{record?.id}</Typography>
            <Typography>Content</Typography>
            // highlight-next-line
            <MarkdownField value={record?.content} />
        </Show>
    );
};

interface IPost {
    id: number;
    title: string;
    content: string;
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/markdown/mardownFieldMui.png" alt="MarkdownField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/MarkdownField" value-description="Markdown data to render"/>

## Example

<StackblitzExample path="input-custom" />
