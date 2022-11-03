---
id: markdown
title: Markdown
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

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-chakra-ui";

// visible-block-start
import { useShow } from "@pankod/refine-core";
import { Show, Text, MarkdownField } from "@pankod/refine-chakra-ui";

const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Text fontWeight="bold">Id:</Text>
            <Text>{record?.id}</Text>
            <Text fontWeight="bold" mt="sm">
                Content:
            </Text>
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

<PropsTable module="@pankod/refine-chakra-ui/MarkdownField" value-description="Markdown data to render"/>
