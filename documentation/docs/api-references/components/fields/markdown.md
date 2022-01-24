---
id: markdown
title: Markdown
---

import markdownField from '@site/static/img/guides-and-concepts/fields/markdown/markdownfield.png';

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

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
    id: string;    
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

| Property | Description             | Type                    |
| -------- | ----------------------- | ----------------------- |
| value    | Markdown data to render | `string` \| `undefined` |


## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-custom-inputs-example-ziduz?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-custom-inputs-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
