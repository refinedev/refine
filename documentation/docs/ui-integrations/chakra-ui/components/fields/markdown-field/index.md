---
title: Markdown
swizzle: true
---

```tsx live shared
const { default: routerProvider } = LegacyRefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  legacyRouterProvider: routerProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  Layout: RefineChakra.Layout,
  Sider: () => null,
});

const Wrapper = ({ children }) => {
  return (
    <ChakraUI.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </ChakraUI.ChakraProvider>
  );
};
```

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/samples", "/samples/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  Show,
  // highlight-next-line
  MarkdownField,
} from "@refinedev/chakra-ui";
import { Heading, Text } from "@chakra-ui/react";

const SampleShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <Text mt={2}>{record?.id}</Text>
      <Heading as="h5" size="sm" mt={4}>
        Content
      </Heading>
      {/* highlight-next-line */}
      <MarkdownField value={record?.content} />
    </Show>
  );
};

interface IPost {
  id: number;
  content: string;
}
// visible-block-end

const App = () => {
  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "samples",
          show: SampleShow,
          list: () => (
            <ChakraUI.VStack alignItems="flex-start">
              <ChakraUI.Text>This page is empty.</ChakraUI.Text>
              <RefineChakra.ShowButton colorScheme="black" recordItemId="123">
                Show Item 123
              </RefineChakra.ShowButton>
            </ChakraUI.VStack>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/MarkdownField" value-description="Markdown data to render"/>
