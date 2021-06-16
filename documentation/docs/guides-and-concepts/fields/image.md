---
id: image
title: Image
---

import imageField from '@site/static/img/guides-and-concepts/fields/image/imageField.png'

This field is used to display images and uses `<Image>` from Ant Design.

[Refer to `<Image>` documentation for detailed usage. &#8594](https://ant.design/components/image/#header)

## Usage

Let's see how to use `<ImageField>` with the example in the edit page.

```tsx
import { List, Table, ImageField } from "@pankod/refine";
import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    return (
        <List>
            <Table<IPost> rowKey="id">
                //highlight-next-line
                ...
                <Table.Column<IPost>
                    key="image"
                    title="Image"
                    dataIndex="image"
                    render={(_, record) => (
                        //highlight-start
                        <ImageField
                            value={record.image[0].url}
                            title={record.image[0].name}
                            width={200}
                        />
                    )}
                    //highlight-end
                />
            </Table>
        </List>
    );
};
```

```tsx title="interfaces/index.d.ts"
interface IPost {
    id: string;
    title: string;
    image: [
        {
            url: string;
        },
    ];
}
```

<br/>
<div>
    <img src={imageField} alt="Image Field Usage"/>
</div>

## API Reference

### Properties

| Property   | Description                | Type                                                     | Default |
| ---------- | -------------------------- | -------------------------------------------------------- | ------- |
| value      | Image path                 | `string` \| `undefined`                                  |         |
| imageTitle | Image title value          | `string` \| `undefined`                                  |         |
| ImageProps | Ant Design `<Image>` props | [`ImageProps`](https://ant.design/components/image/#API) |         |
