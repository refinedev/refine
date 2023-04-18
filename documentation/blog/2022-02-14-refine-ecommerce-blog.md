---
title: Next.js E-commerce App with Strapi and Chakra UI
description: Learn the power of Refine for e-commerce with this quick & easy example. This step-by-step Refine SPA tutorial will get you started in no time.
slug: handcrafted-nextjs-e-commerce-app-tutorial-strapi-chakra-ui
authors: melih
tags: [refine, strapi, chakra-ui, nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-02-14-refine-ecommerce-blog/basket.gif" alt="basket" />
</div>
<br />

In this article, we will create the e-commerce client of our [Strapi-Multitenancy](/docs/advanced-tutorials/multi-tenancy/strapi-v4) admin panel that we have done before.

It is now used **headless** with the **refine** 3 version. You can use any UI library you want with the **headless** feature.

We will use [Strapi](https://strapi.io/) and [Chakra-UI](https://chakra-ui.com/) together with [**Next.js**](/docs/packages/documentation/routers/nextjs) in our E-commerce client example application.

<!--truncate-->

## Refine Project Setup

Let's start by creating our **refine** project. You can use the [superplate](https://github.com/pankod/superplate) to create a refine project.

```bash
npm create refine-app@latest refine-ecommerce-example -- -p refine-nextjs -b v3
```

```bash
✔ What will be the name of your app · refine-ecommerce-example
✔ Package manager: · npm
✔ Do you want to using UI Framework? > No(headless)
✔ Data Provider: Strapi
✔ i18n - Internationalization: · no
```

superplate will quickly create our **refine** project according to the features we choose. Let's continue by install the [**refine** Strapi-v4 Data Provider](/docs/packages/documentation/data-providers/strapi-v4/) and Chakra-UI packages that we will use later.

## Installation

```bash
cd refine-ecommerce-example

npm i @refinedev/strapi-v4 @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
```

Our **refine** project and installations are now ready! Let's start using it.

## Usage

### Configure Refine for Strapi-v4

```tsx title="pages/_app.tsx"
import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
//highlight-next-line
import { DataProvider } from "@refinedev/strapi-v4";

const API_URL = "https://api.strapi-multi-tenant.refine.dev/api";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    //highlight-next-line
    const dataProvider = DataProvider(API_URL);

    return (
        <Refine
            routerProvider={routerProvider}
            //highlight-next-line
            dataProvider={dataProvider}
        >
            <Component {...pageProps} />
        </Refine>
    );
}
```

### Chakra-UI Provider Setup

```tsx title="pages/_app.tsx"
import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { DataProvider } from "@refinedev/strapi-v4";

//highlight-next-line
import { ChakraProvider } from "@chakra-ui/react";

const API_URL = "https://api.strapi-multi-tenant.refine.dev/api";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const dataProvider = DataProvider(API_URL);

    return (
        <Refine routerProvider={routerProvider} dataProvider={dataProvider}>
            //highlight-start
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
            //highlight-end
        </Refine>
    );
}
```

## Create Strapi Collections

We created three collections on Strapi as `store`, `product` and `order` and added a relation between them. For detailed information on how to create a collection, you can check [here](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html).

We created our collections in the previous Strapi Multitenancy guide. Now we will use the same collections.

[Refer to the Project Collections for detailed information. →](https://refine.dev/docs/guides-and-concepts/multi-tenancy/strapi-v4/#create-collections)

## Create Refine Layout

**refine** **headless** is not affiliated with any UI. It is entirely up to you to customize your UI. Let's create a simple layout for this example.

The Layout we've created now will only show the **refine** logo. In the following steps, we will edit our Layout.

```tsx title="components/Layout.tsx"
import { LayoutProps } from "@refinedev/core";
import { Box, Container, Flex, Image } from "@chakra-ui/react";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            backgroundColor={"#eeeeee"}
            minH={"100vh"}
        >
            <Container maxW={"container.lg"}>
                <Flex justify={"space-between"} mt={4} alignSelf={"center"}>
                    <a href="https://refine.dev">
                        <Image alt="Refine Logo" src={"./refine_logo.png"} />
                    </a>
                </Flex>
                {children}
            </Container>
        </Box>
    );
};
```

```tsx title="pages/_app.tsx"
import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { DataProvider } from "@refinedev/strapi-v4";

import { ChakraProvider } from "@chakra-ui/react";
//highlight-next-line
import { Layout } from "src/components";

const API_URL = "https://api.strapi-multi-tenant.refine.dev/api";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const dataProvider = DataProvider(API_URL);

    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            //highlight-next-line
            Layout={Layout}
        >
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </Refine>
    );
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-02-14-refine-ecommerce-blog/layout.png" alt="layout" />
</div>
<br />

## Product Card Design with Chakra-UI

Let's design our product cards with Chakra-UI.

```tsx title="src/components/ProductCard.tsx"
import React from "react";
//highlight-next-line
import { Box, Image, Badge, Button } from "@chakra-ui/react";

export type ProductProps = {
    id: string;
    title: string;
    description: string;
    cardImage: string;
};

export const ProductCard: React.FC<ProductProps> = ({
    id,
    title,
    description,
    cardImage,
}) => {
    return (
        <Box maxH={"sm"} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image w={"100%"} h={200} src={cardImage} />
            <Box p="6" bgColor={"gray.600"}>
                <Box display="flex" alignItems="baseline" mb={2} ml={-2}>
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        New Product
                    </Badge>
                </Box>

                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                    color={"white"}
                >
                    {title}
                </Box>

                <Box color={"white"}>{}</Box>
                <Box
                    color="white"
                    fontSize="sm"
                    display={"flex"}
                    mt={4}
                    justifyContent={"flex-end"}
                ></Box>
            </Box>
        </Box>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-02-14-refine-ecommerce-blog/sample_product.png" alt="sample_product" />
</div>
<br />

We created our Product Card component. Now let's move on to the process of fetch and showing our products from the Strapi.

## Fetch Products with SSR

First, let's fetch our products with the nextjs `getServerSideProps` function.

### `GetServerSideProps`

```tsx title="pages/index.tsx"
//highlight-next-line
import { GetServerSideProps } from "next";
import { DataProvider } from "@refinedev/strapi-v4";

import { IProduct } from "interfaces";

const API_URL = "https://api.strapi-multi-tenant.refine.dev/api";

//highlight-start
export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await DataProvider(API_URL).getList<IProduct>({
        resource: "products",
        meta: { populate: ["image"] },
    });

    return {
        props: { products: data },
    };
};
//highlight-end
```

### Create Product List with Refine

Let's process the data we fetch above using **refine**'s `useTable` hook. Then let's put our data in our ProductCard component.

```tsx title="pages/index.tsx"
import { GetServerSideProps } from "next";
//highlight-next-line
import { LayoutWrapper, GetListResponse, useTable } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";

import { IProduct } from "interfaces";
import { SimpleGrid } from "@chakra-ui/react";
import { ProductCard } from "src/components";

const API_URL = "https://api.strapi-multi-tenant.refine.dev/api";

//highlight-start
type ItemProps = {
    products: GetListResponse<IProduct>;
};
//highlight-end

export const ProductList: React.FC<ItemProps> = ({ products }) => {
    //highlight-start
    const { tableQueryResult } = useTable<IProduct>({
        resource: "products",
        queryOptions: {
            initialData: products,
        },
        meta: { populate: ["image"] },
    });
    //highlight-end

    return (
        //highlight-start
        <LayoutWrapper>
            <SimpleGrid columns={[1, 2, 3]} mt={6} spacing={3}>
                {tableQueryResult.data?.data.map((item) => (
                    <ProductCard
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        cardImage={
                            item.image
                                ? API_URL + item.image.url
                                : "./error.png"
                        }
                    />
                ))}
            </SimpleGrid>
        </LayoutWrapper>
        //highlight-end
    );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await DataProvider(API_URL).getList<IProduct>({
        resource: "products",
        meta: { populate: ["image"] },
    });

    return {
        props: { products: data },
    };
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-02-14-refine-ecommerce-blog/products.png" alt="products" />
</div>
<br />

## Adding Store-based Filtering

We have fetch all the products above. Now, let's fetch the stores and list the store-specific products separately.

First, let's fetch our stores by using the **refine** `useMany` hook within the `getServerSideProps` function. Next we will create buttons for the stores. When these buttons are clicked, a store is selected, we will do a filtering with `useTable` `setFilters` and list the products specific to that store.

```tsx title="pages/index.tsx"
export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await DataProvider(API_URL).getList<IProduct>({
        resource: "products",
        meta: { populate: ["image"] },
        pagination: { current: 1, pageSize: 9 },
    });

    //highlight-start
    const { data: storesData } = await DataProvider(API_URL).getMany({
        resource: "stores",
        ids: ["1", "2", "3"],
    });
    //highlight-end

    return {
        props: {
            products: data,
            //highlight-next-line
            stores: storesData,
        },
    };
};
```

```tsx title="pages/index.tsx"
import { GetServerSideProps } from "next";
import { LayoutWrapper, GetListResponse, useTable } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";

import { IProduct, IStore } from "interfaces";
import { Button, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { ProductCard, FilterButton } from "src/components";

const API_URL = "https://api.strapi-multi-tenant.refine.dev/api";

type ItemProps = {
    products: GetListResponse<IProduct>;
    //highlight-next-line
    stores: IStore[];
};

export const ProductList: React.FC<ItemProps> = ({ products, stores }) => {
    const { tableQueryResult, setFilters } = useTable<IProduct>({
        resource: "products",
        queryOptions: {
            initialData: products,
        },
        meta: { populate: ["image"] },
    });

    return (
        <LayoutWrapper>
            //highlight-start
            <Flex mt={6} gap={2}>
                <FilterButton
                    setFilters={() =>
                        setFilters([
                            {
                                field: "stores][id]",
                                operator: "eq",
                                value: undefined,
                            },
                        ])
                    }
                >
                    <Text fontSize={{ base: "12px", md: "14px", lg: "14px" }}>
                        All Products
                    </Text>
                </FilterButton>
                {stores?.map((item) => {
                    return (
                        <FilterButton
                            setFilters={() =>
                                setFilters([
                                    {
                                        field: "stores][id]",
                                        operator: "eq",
                                        value: item.id,
                                    },
                                ])
                            }
                        >
                            <Text
                                fontSize={{
                                    base: "12px",
                                    md: "14px",
                                    lg: "14px",
                                }}
                            >
                                {item.title}
                            </Text>
                        </FilterButton>
                    );
                })}
            </Flex>
            //highlight-end
            <SimpleGrid columns={[1, 2, 3]} mt={6} spacing={3}>
                {tableQueryResult.data?.data.map((item) => (
                    <ProductCard
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        cardImage={
                            item.image
                                ? API_URL + item.image.url
                                : "./error.png"
                        }
                    />
                ))}
            </SimpleGrid>
        </LayoutWrapper>
    );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await DataProvider(API_URL).getList<IProduct>({
        resource: "products",
        meta: { populate: ["image"] },
        pagination: { current: 1, pageSize: 9 },
    });

    const { data: storesData } = await DataProvider(API_URL).getMany({
        resource: "stores",
        ids: ["1", "2", "3"],
    });

    return {
        props: {
            products: data,
            stores: storesData,
        },
    };
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-02-14-refine-ecommerce-blog/pagination.gif" alt="pagination" />
</div>
<br />

## Adding Pagination

We list all products on our `All Products` page. Let's add pagination to this page and divide the products into pages. We will perform pagination using the `pageSize`, `current` and setCurrent properties from the useTable hook.

[Refer to the useTable documentation for detailed information. →](https://refine.dev/docs/core/hooks/useTable/#pagination)

```tsx title="pages/index.tsx"
import { GetServerSideProps } from "next";
import { LayoutWrapper, GetListResponse, useTable } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";

import { IProduct, IStore } from "interfaces";
import { Button, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { ProductCard, FilterButton } from "src/components";

const API_URL = "https://api.strapi-multi-tenant.refine.dev/api";

type ItemProps = {
    products: GetListResponse<IProduct>;
    stores: IStore[];
};

export const ProductList: React.FC<ItemProps> = ({ products, stores }) => {
    //highlight-start
    const { tableQueryResult, setFilters, current, setCurrent, pageSize } =
        useTable<IProduct>({
            resource: "products",
            queryOptions: {
                initialData: products,
            },
            initialPageSize: 9,
            meta: { populate: ["image"] },
        });
    //highlight-end

    //highlight-next-line
    const totalPageCount = Math.ceil(tableQueryResult.data?.total!! / pageSize);

    return (
        <LayoutWrapper>
            <Flex mt={6} gap={2}>
                <FilterButton
                    setFilters={() =>
                        setFilters([
                            {
                                field: "stores][id]",
                                operator: "eq",
                                value: undefined,
                            },
                        ])
                    }
                >
                    <Text fontSize={{ base: "12px", md: "14px", lg: "14px" }}>
                        All Products
                    </Text>
                </FilterButton>
                {stores?.map((item) => {
                    return (
                        <FilterButton
                            setFilters={() =>
                                setFilters([
                                    {
                                        field: "stores][id]",
                                        operator: "eq",
                                        value: item.id,
                                    },
                                ])
                            }
                        >
                            <Text
                                fontSize={{
                                    base: "12px",
                                    md: "14px",
                                    lg: "14px",
                                }}
                            >
                                {item.title}
                            </Text>
                        </FilterButton>
                    );
                })}
            </Flex>
            <SimpleGrid columns={[1, 2, 3]} mt={6} spacing={3}>
                {tableQueryResult.data?.data.map((item) => (
                    <ProductCard
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        cardImage={
                            item.image
                                ? API_URL + item.image.url
                                : "./error.png"
                        }
                    />
                ))}
            </SimpleGrid>
            //highlight-start
            <Flex justify={"flex-end"} mt={4} mb={4} gap={2}>
                {Array.from(Array(totalPageCount), (e, i) => {
                    if (current > totalPageCount) {
                        setCurrent(i);
                    }
                    return (
                        <Button
                            colorScheme={"teal"}
                            onClick={() => setCurrent(i + 1)}
                        >
                            {"Page: " + (i + 1)}
                        </Button>
                    );
                })}
            </Flex>
            //highlight-end
        </LayoutWrapper>
    );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await DataProvider(API_URL).getList<IProduct>({
        resource: "products",
        meta: { populate: ["image"] },
        pagination: { current: 1, pageSize: 9 },
    });

    const { data: storesData } = await DataProvider(API_URL).getMany({
        resource: "stores",
        ids: ["1", "2", "3"],
    });

    return {
        props: { products: data, stores: storesData },
    };
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-02-14-refine-ecommerce-blog/page_size.gif" alt="page_size" />
</div>
<br />

## Adding Basket and Payment features with Snipcart

One of the steps that should be in an E-commerce application is the cart and payment transactions. In our example, we will use [Snipcart](https://snipcart.com/) for this process.

[Refer to the Snipcart documentation for detailed information. →](https://docs.snipcart.com/v3/)

### Installation Snipcart Widget

```tsx title="pages/_app.tsx"
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const dataProvider = DataProvider(API_URL);

    return (
        <>
            //highlight-start
            <Head>
                <link rel="preconnect" href="https://app.snipcart.com" />
                <link
                    rel="stylesheet"
                    href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
                />
                <script
                    async
                    src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"
                />
            </Head>
            //highlight-end
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                resources={[{ name: "products" }]}
                Layout={Layout}
            >
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </Refine>
            //highlight-start
            <div hidden id="snipcart" data-api-key="YOUR_SNIPCART_TEST_KEY" />
            //highlight-end
        </>
    );
}
```

### Adding "Add to Basket" Button on ProductCard component

```tsx title="src/components/ProductCard.tsx"
import React from "react";
import { Box, Image, Badge, Button } from "@chakra-ui/react";

export type ProductProps = {
    id: string;
    title: string;
    description: string;
    cardImage: string;
};

export const ProductCard: React.FC<ProductProps> = ({
    id,
    title,
    description,
    cardImage,
}) => {
    return (
        <Box
            maxH={"sm"}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
        >
            <Image w={"100%"} h={200} src={cardImage} />
            <Box p="6" bgColor={"gray.600"}>
                <Box display="flex" alignItems="baseline" mb={2} ml={-2}>
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        New Product
                    </Badge>
                </Box>

                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                    color={"white"}
                >
                    {title}
                </Box>
                <Box
                    color="white"
                    fontSize="sm"
                    display={"flex"}
                    mt={4}
                    justifyContent={"flex-end"}
                >
                    //highlight-start
                    <Button
                        className="buy-button snipcart-add-item"
                        bgColor={"green.400"}
                        data-item-id={id}
                        data-item-price="5"
                        data-item-url="/"
                        data-item-name={title}
                        data-item-description={description}
                        data-item-image={cardImage}
                    >
                        Add to Basket
                    </Button>
                    //highlight-end
                </Box>
            </Box>
        </Box>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-02-14-refine-ecommerce-blog/basket.gif" alt="basket" />
</div>
<br />

## Conclusion

One of the biggest features that distinguishes **refine** from other frameworks is that it is customizable. Combined with **refine** **headless**, it now provides more customization options. This provides a great deal of convenience in the project you will develop.

As you can see in this article, we have developed the Client part of our [Admin Panel](https://refine.dev/docs/guides-and-concepts/multi-tenancy/strapi-v4/), which we have done before, with **refine**. **refine** offers the opportunity to develop B2B and B2C applications without any restrictions and in a fully customizable manner.

[Refer to the Admin side of the project →](https://refine.dev/docs/guides-and-concepts/multi-tenancy/strapi-v4/)

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-ecommerce-example-9rvzv?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-ecommerce-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
