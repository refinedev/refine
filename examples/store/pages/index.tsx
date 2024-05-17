import React from "react";
import { GetServerSideProps } from "next";
import {
  CrudFilter,
  GetListResponse,
  useGo,
  useList,
  useParsed,
  useTable,
} from "@refinedev/core";
import { dataProvider } from "@refinedev/medusa";
import { Product, ProductCollection, StoreCartsRes } from "@medusajs/medusa";
import nookies from "nookies";

import { useCartContext } from "@lib/context";
import {
  CART_COOKIE_KEY,
  REGION_COOKIE_KEY,
  SERVER_API_URL,
} from "src/contants";
import clsx from "clsx";
import { ButtonCategory } from "@components/button-category";
import { ProductGridItem } from "@components/product-grid-item";

type Props = {
  initialResults?: GetListResponse<Product>;
  initialCategories?: GetListResponse<ProductCollection>;
};

const Home = ({ initialCategories, initialResults }: Props) => {
  const go = useGo();
  const { params } = useParsed();
  const { cartId } = useCartContext();

  const { data: categories } = useList<ProductCollection>({
    resource: "collections",
    queryOptions: {
      initialData: initialCategories,
    },
  });

  const selectedCategory = React.useMemo(() => {
    return categories?.data.find(
      (category) => category.handle === params?.category,
    );
  }, [categories, params?.category]);

  const searchQuery = React.useMemo(() => {
    return params?.q;
  }, [params?.q]);

  React.useEffect(() => {
    setFilters(
      [
        {
          field: "collection_id",
          operator: "eq",
          value: selectedCategory?.id ? [selectedCategory?.id] : undefined,
        },
      ],
      "replace",
    );
  }, [selectedCategory]);

  React.useEffect(() => {
    setFilters(
      [
        {
          field: "q",
          operator: "eq",
          value: searchQuery,
        },
      ],
      "replace",
    );
  }, [searchQuery]);

  const {
    tableQueryResult: { data: products },
    filters,
    setFilters,
  } = useTable<Product>({
    resource: "products",
    filters: {
      permanent: [
        {
          field: "cart_id",
          value: cartId,
          operator: "eq",
        },
      ],
    },
    pagination: { mode: "off" },
    queryOptions: {
      initialData: initialResults,
    },
  });

  const selectCategory = React.useCallback(
    (value?: string | undefined) => {
      go({
        query: {
          category: value,
        },
        options: { keepQuery: false },
      });
    },
    [go],
  );

  return (
    <div className={clsx("flex", "items-start", "justify-center", "gap-8")}>
      <div
        className={clsx(
          "hidden",
          "w-[200px]",
          "flex-shrink-0",
          "lg:flex",
          "flex-col",
          "gap-2",
        )}
      >
        <ButtonCategory
          onClick={() => {
            selectCategory();
          }}
          active={selectedCategory === undefined}
        >
          All Items
        </ButtonCategory>
        {categories?.data.map((category) => (
          <ButtonCategory
            key={category.id}
            onClick={() => {
              selectCategory(category.handle);
            }}
            active={selectedCategory?.id === category.id}
          >
            {category.title}
          </ButtonCategory>
        ))}
      </div>
      <div
        className={clsx(
          "flex-1",
          "grid",
          "grid-cols-1",
          "md:grid-cols-2",
          "lg:grid-cols-3",
          "gap-x-8",
          "gap-y-16",
        )}
      >
        {products?.data.map((product) => (
          <ProductGridItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { query } = context;
  const { category = undefined, q = undefined } = query;

  const cookies = nookies.get(context);

  const medusaDataProvider = dataProvider(SERVER_API_URL);

  const getRegion = () => {
    const region = cookies[REGION_COOKIE_KEY];

    if (region) {
      return JSON.parse(region) as {
        regionId: string;
        countryCode: string;
      };
    }
    return null;
  };

  const createNewCart = async () => {
    const region = getRegion();

    const { data } = await medusaDataProvider.create<StoreCartsRes>({
      resource: "carts",
      variables: {
        region_id: region?.regionId,
      },
    });

    nookies.set(context, CART_COOKIE_KEY, data.cart.id, {
      path: "/",
    });
    nookies.set(
      context,
      REGION_COOKIE_KEY,
      JSON.stringify({
        regionId: data.cart.region.id,
        countryCode: region?.countryCode ?? data.cart.region.countries[0].iso_2,
      }),
      {
        path: "/",
      },
    );

    return data.cart.id;
  };

  try {
    let cartId = cookies[CART_COOKIE_KEY];

    if (!cartId) {
      cartId = await createNewCart();
    }

    const categories = await medusaDataProvider.getList<ProductCollection>({
      resource: "collections",
    });

    const categoryId = categories?.data.find(
      (cat) => cat.handle === category,
    )?.id;

    const queryFilters: CrudFilter[] = [
      ...(categoryId && !q
        ? [
            {
              field: "collection_id",
              operator: "eq",
              value: [categoryId],
            } as CrudFilter,
          ]
        : []),
      ...(q
        ? [
            {
              field: "q",
              operator: "eq",
              value: q,
            } as CrudFilter,
          ]
        : []),
    ];

    const filters: CrudFilter[] = [
      {
        field: "cart_id",
        value: cartId,
        operator: "eq",
      },
      ...queryFilters,
    ];

    const products = await medusaDataProvider.getList<Product>({
      resource: "products",
      filters,
    });

    context.res.setHeader(
      "Cache-Control",
      // cache for 12 hours
      // serve stale content while revalidating for 24 hours
      `public, s-maxage=${60 * 60 * 12}, stale-while-revalidate=${
        60 * 60 * 24
      }`,
    );

    return {
      props: {
        initialResults: products,
        initialCategories: categories,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};
