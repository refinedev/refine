---
id: text
title: Text
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
    routerProvider,
    dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
    Layout: RefineChakra.Layout,
    Sider: () => null,
});

const Wrapper = ({ children }) => {
    return (
        <RefineChakra.ChakraProvider
            theme={RefineChakra.refineTheme}
        >
            {children}
        </RefineChakra.ChakraProvider>
    );
};
```

This field lets you show basic text. It uses Mantine [`<Text>`](https://chakra-ui.com/docs/components/text/usage) component.

## Usage

Let's see how to use it in a basic show page:

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-chakra-ui";

// visible-block-start
import { useShow } from "@pankod/refine-core";
import { Show, Text, TextField } from "@pankod/refine-chakra-ui";

const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Text fontWeight="bold">Id</Text>
            <Text mt="md">{record?.id}</Text>

            <Text fontWeight="bold" mt="sm">
                Title
            </Text>
            <Text mt="md">{record?.title}</Text>
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
            resources={[
                {
                    name: "posts",
                    show: PostShow,
                    list: () => (
                        <div>
                            <p>This page is empty.</p>
                            <ShowButton recordItemId="123">
                                Show Item 123
                            </ShowButton>
                        </div>
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

<PropsTable module="@pankod/refine-chakra-ui/TextField" />

:::tip External Props
It also accepts all props of Chakra UI [Text](https://chakra-ui.com/docs/components/text/usage).
:::
