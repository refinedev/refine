import React from "react";
import { GetListParams, GetListResponse } from "@refinedev/core";
import { dataProvider } from "@providers/data-provider/server";
import { Category, Product } from "src/types";
import { ProductsTable } from "@components/products/table";
import { CategoriesNavLinks } from "@components/categories";

type CategoryShowPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CategoryShowPage({
  params,
  searchParams,
}: CategoryShowPageProps) {
  const { categories, products } = await getData({
    categoryId: params.id,
    productPaginationOptions: {
      current: searchParams.current
        ? Number(searchParams.current as string)
        : 1,
    },
  });

  return (
    <div className="container pt-6 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-7xl lg:leading-[80px] font-bold text-white">
            Delight
            <div>in every bite!</div>
          </h1>
          <h2 className="text-xl lg:text-3xl lg:leading-10 text-white mt-2">
            Delivering happiness,{" "}
            <span className="underline whitespace-nowrap">on time.</span>
          </h2>
        </div>
        <img
          className="aspect-[444/384] w-[222px] lg:w-[444px]"
          src="/images/plate.png"
          alt="Plate with pasta"
        />
      </div>
      <div className="bg-white rounded-t-[36px] rounded-b-[20px]">
        <CategoriesNavLinks
          categories={categories}
          selectedCategoryId={params.id}
        />
        <ProductsTable
          refineCoreProps={{
            queryOptions: {
              initialData: products,
            },
            permanentFilter: [
              {
                field: "category.id",
                operator: "eq",
                value: params.id,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

type GetDataProps = {
  categoryId: string;
  productPaginationOptions?: GetListParams["pagination"];
};

async function getData(props: GetDataProps) {
  try {
    const categoriesData: GetListResponse<Category> =
      await dataProvider.getList({
        resource: "categories",
        pagination: {
          mode: "off",
        },
      });

    const productData: GetListResponse<Product> = await dataProvider.getList({
      resource: "products",
      pagination: {
        pageSize: 6,
        ...props.productPaginationOptions,
      },
      filters: [
        {
          field: "category.id",
          operator: "eq",
          value: props.categoryId,
        },
      ],
    });

    return {
      categories: categoriesData,
      products: productData,
    };
  } catch (error) {
    return {
      categories: {
        total: 0,
        data: [],
      },
      products: {
        total: 0,
        data: [],
      },
    };
  }
}
