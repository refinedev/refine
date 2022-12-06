---
id: markdown
title: Markdown
swizzle: true
---

import markdownField from '@site/static/img/guides-and-concepts/fields/markdown/markdownfield.png';

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx  title="pages/posts/show.tsx"
import { useShow, IResourceComponentsProps } from "@pankod/refine-core";
import {
    Show,
    Typography,
    // highlight-next-line
    MarkdownField,
} from "@pankod/refine-antd";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Content</Title>

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
    <img src={markdownField} alt="MarkdownField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/MarkdownField" value-description="Markdown data to render"/>

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/inputs/customInputs?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-custom-inputs-example"
></iframe>
