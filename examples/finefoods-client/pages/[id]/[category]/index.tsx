/* eslint-disable react/jsx-key */
import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { GetListResponse } from "@refinedev/core";
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

type CategoryPageProps = {
    category: ICategory;
    products: GetListResponse<IProduct>;
};

const Category: React.FC<CategoryPageProps> = ({ category, products }) => {
    const { query } = useRouter();
    const { id } = query;

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
        <div className="container mx-auto overflow-hidden rounded-xl bg-white">
            <div
                className="flex h-48 items-center bg-cover bg-center bg-no-repeat pl-6"
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${category.cover})`,
                }}
            >
                <h1 className="text-5xl font-extrabold uppercase text-white">
                    {category.title}
                </h1>
            </div>
            <table className="w-full">
                <tbody>
                    {getRowModel().rows.map((row) => {
                        return (
                            <tr
                                key={row.id}
                                className="border-b border-gray-100"
                            >
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

            <div className="my-4 flex justify-end px-4">
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
    );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    try {
        const { data: categoryData } = await dataProvider(API_URL).getOne({
            resource: "categories",
            id: id as string,
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
            props: { category: categoryData, products: productData },
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
