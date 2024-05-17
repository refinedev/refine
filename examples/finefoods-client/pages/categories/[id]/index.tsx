import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { GetListResponse, useNavigation } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { useTable } from "@refinedev/react-table";

import { ColumnDef, flexRender } from "@tanstack/react-table";

import {
  ProductListItem,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@components";
import { ICategory, IProduct } from "@interfaces";
import { API_URL } from "src/constants";
import Link from "next/link";
import cn from "classnames";

type CategoryShowPageProps = {
  categories: GetListResponse<ICategory>;
  products: GetListResponse<IProduct>;
};

const CategoryShowPage: React.FC<CategoryShowPageProps> = ({
  categories,
  products,
}) => {
  const { query } = useRouter();
  const { id } = query;

  const { showUrl } = useNavigation();

  const columns = React.useMemo<ColumnDef<IProduct>[]>(
    () => [
      {
        id: "product",
        accessorFn: (row) => row,
        cell: function render({ row }) {
          return <ProductListItem product={row.original} />;
        },
      },
    ],
    [],
  );

  const {
    options: {
      state: { pagination },
    },
    getRowModel,
    setPageIndex,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    nextPage,
    previousPage,
  } = useTable<IProduct>({
    columns,
    refineCoreProps: {
      resource: "products",
      queryOptions: {
        initialData: products,
      },
      initialPageSize: 6,
      permanentFilter: [
        {
          field: "category.id",
          operator: "eq",
          value: id,
        },
      ],
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
        <div className="flex flex-wrap items-center justify-center gap-2 p-4 border-b border-[#DEDEDE]">
          {categories.data.map((category) => {
            return (
              <Link href={showUrl("categories", category.id)} key={category.id}>
                <div
                  className={cn(
                    "px-4 py-2 text-sm font-bold rounded-full transition-colors ease-in-out duration-100 whitespace-nowrap",
                    category.id === Number(id)
                      ? "bg-primary text-white"
                      : "text-black hover:bg-primary/50",
                  )}
                >
                  {category.title}
                </div>
              </Link>
            );
          })}
        </div>

        <table className="w-full">
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="border-b border-gray-100">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="p-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="py-4 flex justify-end px-4">
          <button
            className="border px-2 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            <ChevronLeftIcon className="text-primary h-5 w-5" />
          </button>
          {getPageOptions().map((page) => (
            <button
              key={page}
              className={`border px-4 py-2 text-sm font-medium hover:bg-gray-50 ${
                pagination?.pageIndex === page ? "text-primary" : ""
              }`}
              onClick={() => setPageIndex(page)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="border px-2 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            <ChevronRightIcon className="text-primary h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryShowPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const categoriesData = await dataProvider(API_URL).getList({
      resource: "categories",
      pagination: {
        mode: "off",
      },
    });

    const productData = await dataProvider(API_URL).getList({
      resource: "products",
      pagination: {
        pageSize: 6,
      },
      filters: [
        {
          field: "category.id",
          operator: "eq",
          value: id,
        },
      ],
    });

    return {
      props: {
        categories: categoriesData,
        products: productData,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
