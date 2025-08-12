---
title: Url
swizzle: true
---

This field lets you embed a link. It uses Ant Design's [<Typography.Link\>](https://ant.design/components/typography/) component. You can pass a URL in its `value` prop and you can show a text in its place by passing any `children`.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<UrlField>` with an example:

```tsx live previewHeight=280px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

import { List, UrlField, useTable } from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["image", "0", "url"]}
          title="Image"
          // highlight-next-line
          render={(value: string) => <UrlField value={value} />}
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
  image: IImage[];
}

interface IImage {
  url: string;
}

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <PostList />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/UrlField" value-description="URL for link to reference to"/>

:::simple External Props

This field also accepts all props of Ant Design's [Link](https://ant.design/components/typography/#How-to-use-Typography.Link-in-react-router) component.

:::
