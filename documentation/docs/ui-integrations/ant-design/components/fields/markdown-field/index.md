---
title: Markdown
swizzle: true
---

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page:

```tsx live
import { useShow } from "@refinedev/core";
import {
  Show,
  // highlight-next-line
  MarkdownField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

const SampleShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Content</Title>

      {/* highlight-next-line */}
      <MarkdownField value={record?.content} />
    </Show>
  );
};

interface IPost {
  id: number;
  title: string;
  content: string;
}
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/samples", "/samples/show/123"]}
    resources={[
      {
        name: "samples",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineAntd.ShowButton recordItemId="123">
              Show Item 123
            </RefineAntd.ShowButton>
          </div>
        ),
        show: SampleShow,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/MarkdownField" value-description="Markdown data to render"/>

## Example

<CodeSandboxExample path="input-custom" />
