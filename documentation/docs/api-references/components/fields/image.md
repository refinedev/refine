---
id: image
title: Image
---

import imageField from '@site/static/img/guides-and-concepts/fields/image/imageField.png'

This field is used to display images and uses [`<Image>`](https://ant.design/components/image/#header) from Ant Design.

## Usage

Let's see how we can use `<ImageField>` with the example in the edit page.

```tsx
import { 
    List,
    Table,
    //highlight-next-line
    ImageField 
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    return (
        <List>
            <Table<IPost> rowKey="id">
                <Table.Column
                    dataIndex="title"
                    title="Title"
                />
                <Table.Column<IPost>
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
            name: string;
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
| ImageProps | Ant Design `<Image>` properties | [`ImageProps`](https://ant.design/components/image/#API) |         |
