---
id: markdown
title: Markdown
---

import markdownField from '@site/static/img/guides-and-concepts/fields/markdown/markdownfield.png';

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx title="pages/posts/show.tsx"
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

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Content</Title>
            //highlight-next-line
            <MarkdownField value={record?.content} />
        </Show>
    );
};
```

```ts title="interfaces/index.d.ts"
export interface IPost {   
    id: string;    
    title: string;
}
```

<br/>
<div>
    <img src={markdownField} alt="A markdown field example"/>
</div>

## API Reference

### Properties

| Property | Description             | Type                    |
| -------- | ----------------------- | ----------------------- |
| value    | Markdown data to render | `string` \| `undefined` |


## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-custom-inputs-example-mfmh6?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fposts%2Fedit.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-custom-inputs-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
