/* eslint-disable react/jsx-key */
import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { GetListResponse, LayoutWrapper } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import { useTable, Column, usePagination } from "@pankod/refine-react-table";

import { ProductListItem } from "../../../components/productListItem";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../components/icons";
import { API_URL } from "../../../constants";
import { ICategory, IProduct } from "../../../interfaces";

type CategoryPageProps = {
    category: ICategory;
    products: GetListResponse<IProduct>;
};

const Category: React.FC<CategoryPageProps> = ({ category, products }) => {
    const { query } = useRouter();
    const { id } = query;

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "product",
                accessor: (row: any) => row,
                // eslint-disable-next-line react/display-name
                Cell: ({ value }) => <ProductListItem product={value} />,
            },
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
    } = useTable<IProduct>(
        {
            columns,
            refineTableProps: {
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
        },
        usePagination,
    );

    return (
        <LayoutWrapper>
            <div className="container mx-auto overflow-hidden rounded-xl bg-white">
                <div
                    className="flex items-center h-48 bg-cover bg-center bg-no-repeat pl-6"
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${category.cover})`,
                    }}
                >
                    <h1 className="uppercase text-white text-5xl font-extrabold">
                        {category.title}
                    </h1>
                </div>
                <table className="w-full" {...getTableProps()}>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className="border-b border-gray-100"
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                className="p-4"
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="flex justify-end my-4 px-4">
                    <button
                        className="px-2 py-2 border text-sm font-medium hover:bg-gray-50"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-primary" />
                    </button>
                    {pageOptions.map((page) => (
                        <button
                            className="px-4 py-2 border text-sm font-medium hover:bg-gray-50"
                            onClick={() => gotoPage(page)}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        className="px-2 py-2 border text-sm font-medium hover:bg-gray-50"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        <ChevronRightIcon className="h-5 w-5 text-primary" />
                    </button>
                </div>
            </div>
        </LayoutWrapper>
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
