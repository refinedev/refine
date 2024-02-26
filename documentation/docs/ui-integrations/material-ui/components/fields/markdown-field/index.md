---
title: Markdown
swizzle: true
---

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/docs/packages/list-of-packages) to customize it.

:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx live hideCode url=http://localhost:3000/posts/show/123
// visible-block-start
import React from "react";
import { useShow } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  // highlight-next-line
  MarkdownField,
} from "@refinedev/mui";
import { Stack, Typography } from "@mui/material";

const SampleShow = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow();
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Content
        </Typography>
        {/* highlight-next-line */}
        <MarkdownField value={record?.content} />
      </Stack>
    </Show>
  );
};
// visible-block-end

Show.defaultProps = { breadcrumb: false };

render(
  <RefineMuiDemo
    initialRoutes={["/samples", "/samples/show/123"]}
    resources={[
      {
        name: "samples",
        show: SampleShow,
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId="123">
              Show Item 123
            </RefineMui.ShowButton>
          </div>
        ),
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
