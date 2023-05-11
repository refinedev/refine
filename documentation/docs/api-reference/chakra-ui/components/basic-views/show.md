---
id: show
title: Show
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
        <ShowButton colorScheme="black" recordItemId="123">
            Show Item 123
        </ShowButton>
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

`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page.

We will show what `<Show>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/chakra-ui";
import { Heading, Text, Spacer } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne<ICategory>({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record?.category.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm">
                Id
            </Heading>
            <Text mt={2}>{record?.id}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Title
            </Heading>
            <Text mt={2}>{record?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Status
            </Heading>
            <Text mt={2}>{record?.status}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Category
            </Heading>
            <Text mt={2}>{categoryData?.data?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Content
            </Heading>
            <Spacer mt={2} />
            <MarkdownField value={record?.content} />
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            notificationProvider={RefineChakra.notificationProvider()}
            legacyRouterProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

It allows adding a title for the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Show post".

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show title={<Heading size="lg">Custom Title</Heading>}>
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

The `<Show>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Show>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom/123 previewHeight=280px
setInitialRoutes(["/custom/123"]);

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show resource="categories">
            <p>Rest of your page here</p>
        </Show>
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
                        path: "/custom/:id",
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

### `canDelete` and `canEdit`

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property refine adds the buttons by default.

When clicked on, delete button executes the `useDelete` method provided by the [`dataProvider`](/api-reference/core/providers/data-provider.md) and the edit button redirects the user to the record edit page.

Refer to the [`<DeleteButton>`](/api-reference/chakra-ui/components/buttons/delete.md) and the [`<EditButton>`](/api-reference/chakra-ui/components/buttons/edit.md) documentation for detailed usage.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { usePermissions } from "@refinedev/core";

const PostShow: React.FC = () => {
    const { data: permissionsData } = usePermissions();

    return (
        <Show
            /* highlight-start */
            canDelete={permissionsData?.includes("admin")}
            canEdit={permissionsData?.includes("admin")}
            /* highlight-end */
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    const simpleRestDataProvider = dataProvider(
        "https://api.fake-rest.refine.dev",
    );

    const customDataProvider = {
        ...simpleRestDataProvider,
        deleteOne: async ({ resource, id, variables }) => {
            return {
                data: {},
            };
        },
    };

    const authProvider = {
        login: async () => {
            return {
                success: true,
                redirectTo: "/",
            };
        },
        register: async () => {
            return {
                success: true,
            };
        },
        forgotPassword: async () => {
            return {
                success: true,
            };
        },
        updatePassword: async () => {
            return {
                success: true,
            };
        },
        logout: async () => {
            return {
                success: true,
                redirectTo: "/",
            };
        },
        check: async () => ({
            authenticated: true,
        }),
        onError: async (error) => {
            console.error(error);
            return { error };
        },
        getPermissions: async () => ["admin"],
        getIdentity: async () => null,
    };

    return (
        <RefineHeadlessDemo
            dataProvider={customDataProvider}
            authProvider={authProvider}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

[Refer to the `usePermission` documentation for detailed usage. &#8594](/api-reference/core/hooks/authentication/usePermissions.md)

### `recordItemId`

`<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=350px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { useModalForm } from "@refinedev/react-hook-form";
import { Show } from "@refinedev/chakra-ui";
import {
    Modal,
    Button,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
} from "@chakra-ui/react";

const PostShow: React.FC = () => {
    const {
        modal: { visible, close, show },
        id,
    } = useModalForm({
        refineCoreProps: { action: "show" },
    });

    return (
        <div>
            <Button onClick={() => show()}>Edit Button</Button>
            <Modal isOpen={visible} onClose={close} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Show</ModalHeader>

                    <ModalBody>
                        {/* highlight-next-line */}
                        <Show recordItemId={id}>
                            <p>Rest of your page here</p>
                        </Show>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

:::note
The `<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.
:::

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Show } from "@refinedev/chakra-ui";

// highlight-start
const PostShow = () => {
    return <Show dataProviderName="other">...</Show>;
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            // highlight-start
            dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev/"),
                other: dataProvider("https://other-api.fake-rest.refine.dev/"),
            }}
            // highlight-end
        >
            {/* ... */}
        </Refine>
    );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
/* highlight-next-line */
import { IconMoodSmile } from "@tabler/icons";

const PostShow: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show goBack={<IconMoodSmile />}>
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const PostShow: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show isLoading={true}>
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show, Breadcrumb } from "@refinedev/chakra-ui";
import { Box } from "@chakra-ui/react";

const CustomBreadcrumb: React.FC = () => {
    return (
        <Box borderColor="blue" borderStyle="dashed" borderWidth="2px">
            <Breadcrumb />
        </Box>
    );
};

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            breadcrumb={<CustomBreadcrumb />}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property. For `@refinedev/chakra-ui` wrapper element is `<Box>`s and `wrapperProps` can get every attribute that `<Card>` can get.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            wrapperProps={{
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
                p: "2",
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            headerProps={{
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            contentProps={{
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
                p: "2",
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

By default, the `<Show/>` component has a [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, deleteButtonProps, editButtonProps, listButtonProps, refreshButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::caution

If "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

If [`canDelete`](#candelete-and-canedit) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

If [`canEdit`](#candelete-and-canedit) is `false`, [`<EditButton>`][edit-button] will not render and `editButtonProps` will be `undefined`.

:::

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Button, HStack, Box } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            headerButtons={({ defaultButtons }) => (
                <HStack>
                    {defaultButtons}
                    <Button colorScheme="red">Custom Button</Button>
                </HStack>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `createButtonProps` to utilize the default values of the [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] components.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import {
    Show,
    ListButton,
    EditButton,
    DeleteButton,
    RefreshButton,
} from "@refinedev/chakra-ui";
import { Button, HStack, Box } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            headerButtons={({
                deleteButtonProps,
                editButtonProps,
                listButtonProps,
                refreshButtonProps,
            }) => (
                <HStack>
                    {listButtonProps && (
                        <ListButton
                            {...listButtonProps}
                            meta={{ foo: "bar" }}
                        />
                    )}
                    {editButtonProps && (
                        <EditButton
                            {...editButtonProps}
                            meta={{ foo: "bar" }}
                        />
                    )}
                    {deleteButtonProps && (
                        <DeleteButton
                            {...deleteButtonProps}
                            meta={{ foo: "bar" }}
                        />
                    )}
                    <RefreshButton
                        {...refreshButtonProps}
                        meta={{ foo: "bar" }}
                    />
                    <Button colorScheme="red">Custom Button</Button>
                </HStack>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            headerButtonProps={{
                borderColor: "blue",
                borderStyle: "dashed",
                borderWidth: "2px",
                p: "2",
            }}
            // highlight-end
            headerButtons={
                <Button variant="outline" colorScheme="green">
                    Custom Button
                </Button>
            }
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    return (
        <Show
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
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            footerButtonProps={{
                style: {
                    float: "right",
                    borderColor: "blue",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    padding: "8px",
                },
            }}
            // highlight-end
            footerButtons={<Button colorScheme="green">Custom Button</Button>}
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <RefineHeadlessDemo
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
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

<PropsTable module="@refinedev/chakra-ui/Show" title-default="<Title order={3}>Show {resource.name}</Title>"/>

[list-button]: /docs/api-reference/chakra-ui/components/buttons/list-button/
[refresh-button]: /docs/api-reference/chakra-ui/components/buttons/refresh-button/
[edit-button]: /docs/api-reference/chakra-ui/components/buttons/edit-button/
[delete-button]: /docs/api-reference/chakra-ui/components/buttons/delete-button/
