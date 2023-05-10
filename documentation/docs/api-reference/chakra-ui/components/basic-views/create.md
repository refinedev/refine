---
id: create
title: Create
swizzle: true
---

```tsx live shared
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
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

const DummyListPage = () => (
    <ChakraUI.VStack alignItems="flex-start">
        <ChakraUI.Text>This page is empty.</ChakraUI.Text>
        <CreateButton colorScheme="black" />
    </ChakraUI.VStack>
);

interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}
```

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px hideCode
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

const PostCreate: React.FC = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm<IPost>();

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                />
                <FormErrorMessage>
                    {`${errors.title?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Status</FormLabel>
                <Select
                    id="content"
                    placeholder="Select Post Status"
                    {...register("status", {
                        required: "Status is required",
                    })}
                >
                    <option>published</option>
                    <option>draft</option>
                    <option>rejected</option>
                </Select>
                <FormErrorMessage>
                    {`${errors.status?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <FormLabel>Category</FormLabel>
                <Select
                    id="categoryId"
                    placeholder="Select Category"
                    {...register("categoryId", {
                        required: "Category is required",
                    })}
                >
                    {options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {`${errors.categoryId?.message}`}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create title={<Heading size="lg">Custom Title</Heading>}>
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/api-reference/chakra-ui/components/buttons/save.md)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create saveButtonProps={{ colorScheme: "red" }}>
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `resource`

The `<Create>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Create>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom previewHeight=280px
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { Layout } from "@refinedev/chakra-ui";
// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create resource="categories">
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ],
                // highlight-end
            }}
            Layout={Layout}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
/* highlight-next-line */
import { IconMoodSmile } from "@tabler/icons";

console.log("IconMoodSmile", IconMoodSmile);

const PostCreate: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create goBack={<IconMoodSmile />}>
            <p>Rest of your page here 2</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `isLoading`

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create isLoading={true}>
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/chakra-ui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/chakra-ui/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create, Breadcrumb } from "@refinedev/chakra-ui";
import { Box } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            breadcrumb={
                <Box borderColor="blue" borderStyle="dashed" borderWidth="2px">
                    <Breadcrumb />
                </Box>
            }
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `wrapperProps`

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property. For `@refinedev/chakra-ui` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Box>` can get.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            wrapperProps={{
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `headerProps`

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            headerProps={{
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `contentProps`

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=320px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            contentProps={{
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Button, Box } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            headerButtons={({ defaultButtons }) => (
                <Box
                    borderColor="blue"
                    borderStyle="dashed"
                    borderWidth="2px"
                    p="2"
                >
                    {defaultButtons}
                    <Button colorScheme="red" variant="solid">
                        Custom Button
                    </Button>
                </Box>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            headerButtonProps={{
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
            }}
            // highlight-end
            headerButtons={<Button type="primary">Custom Button</Button>}
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `footerButtons`

By default, the `<Create/>` component has a [`<SaveButton>`][save-button] at the header.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            footerButtons={({ defaultButtons }) => (
                <HStack
                    borderColor="blue"
                    borderStyle="dashed"
                    borderWidth="2px"
                    p="2"
                >
                    {defaultButtons}
                    <Button colorScheme="red" variant="solid">
                        Custom Button
                    </Button>
                </HStack>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] component.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton, SaveButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            footerButtons={({ saveButtonProps }) => (
                <HStack
                    borderColor="blue"
                    borderStyle="dashed"
                    borderWidth="2px"
                    p="2"
                >
                    <SaveButton {...saveButtonProps} hideText />
                    <Button colorScheme="red" variant="solid">
                        Custom Button
                    </Button>
                </HStack>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/chakra-ui";

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            footerButtonProps={{
                float: "right",
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
                p: "2",
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            resources={[
                {
                    name: "posts",
                    create: PostCreate,
                    list: DummyListPage,
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

### Props

<PropsTable module="@refinedev/chakra-ui/Create" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Create {resource.name}</Title>`"/>

[save-button]: /docs/api-reference/chakra-ui/components/buttons/save-button/
