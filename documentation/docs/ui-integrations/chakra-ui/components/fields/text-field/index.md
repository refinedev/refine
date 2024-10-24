---
title: Text
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

This field lets you show basic text. It uses Chakra UI's [`<Text>`](https://www.chakra-ui.com/docs/components/text#usage) component.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

Let's see how to use it in a basic show page:

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  Show,
  // highlight-next-line
  TextField,
} from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      // highlight-next-line
      <TextField value={record?.id} />
      <Heading as="h5" size="sm">
        Title
      </Heading>
      // highlight-next-line
      <TextField value={record?.title} />
    </Show>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

const App = () => {
  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          show: PostShow,
          list: () => (
            <RefineChakra.VStack alignItems="flex-start">
              <RefineChakra.Text>This page is empty.</RefineChakra.Text>
              <ShowButton colorScheme="black" recordItemId="123">
                Show Item 123
              </ShowButton>
            </RefineChakra.VStack>
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

<PropsTable module="@refinedev/chakra-ui/TextField" />

:::simple External Props

It also accepts all props of Chakra UI's [Text](https://www.chakra-ui.com/docs/components/text#usage) component.

:::
