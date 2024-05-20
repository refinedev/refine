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
import { ButtonCategory } from "@components/ui/button-category";
import { ProductGridItem } from "@components/product/product-grid-item";

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
      enabled: false,
    },
  });

  const searchQuery = params?.q;
  const selectedCategoryId = categories?.data.find(
    (category) => category.handle === params?.category,
  )?.id;

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
      initial: [
        ...(selectedCategoryId
          ? [
              {
                field: "collection_id",
                value: [selectedCategoryId],
                operator: "eq",
              } as CrudFilter,
            ]
          : []),
        ...(searchQuery
          ? [
              {
                field: "q",
                value: searchQuery,
                operator: "eq",
              } as CrudFilter,
            ]
          : []),
      ],
    },
    pagination: { mode: "off" },
    queryOptions: {
      initialData: initialResults,
      keepPreviousData: false,
    },
  });

  const activeSearchQuery = filters.find(
    (f) => "field" in f && f.field === "q",
  )?.value;
  const activeCategoryId = filters.find(
    (f) => "field" in f && f.field === "collection_id",
  )?.value?.[0];

  React.useEffect(() => {
    if (
      selectedCategoryId !== activeCategoryId ||
      searchQuery !== activeSearchQuery
    ) {
      setFilters(
        [
          {
            field: "collection_id",
            operator: "eq",
            value: selectedCategoryId ? [selectedCategoryId] : undefined,
          },
          {
            field: "q",
            operator: "eq",
            value: searchQuery ? searchQuery : undefined,
          },
        ],
        "merge",
      );
    }
  }, [selectedCategoryId, activeCategoryId, searchQuery, activeSearchQuery]);

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
          active={params?.category === undefined}
        >
          All Items
        </ButtonCategory>
        {categories?.data.map((category) => (
          <ButtonCategory
            key={category.id}
            onClick={() => {
              selectCategory(category.handle);
            }}
            active={params?.category === category.handle}
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
