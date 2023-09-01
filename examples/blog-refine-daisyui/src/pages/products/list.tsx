import React, { useRef } from "react";
import {
    IResourceComponentsProps,
    getDefaultFilter,
    useDelete,
    useNavigation,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    AscIcon,
    CreateIcon,
    EditIcon,
    ShowIcon,
    DeleteIcon,
    FilterIcon,
    DescIcon,
} from "../../components/icons";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const filterForm: any = useRef(null);

    const { mutate: deleteProduct } = useDelete();

    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "Id",
            },
            {
                id: "name",
                accessorKey: "name",
                header: "Name",
            },
            {
                id: "price",
                accessorKey: "price",
                header: "Price",
            },
            {
                id: "category",
                header: "Category",
                enableSorting: false,
                accessorKey: "category.title",
            },
            {
                id: "description",
                accessorKey: "description",
                enableSorting: false,
                header: "Description",
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <div className="flex justify-around items-center">
                            <button
                                className="btn btn-xs btn-circle btn-ghost m-1"
                                onClick={() => {
                                    edit("products", getValue() as string);
                                }}
                            >
                                <EditIcon />
                            </button>
                            <button
                                className="btn btn-xs btn-circle btn-ghost m-1"
                                onClick={() => {
                                    show("products", getValue() as string);
                                }}
                            >
                                <ShowIcon />
                            </button>
                            <button
                                className="btn btn-xs btn-circle btn-ghost m-1"
                                onClick={() => {
                                    deleteProduct({
                                        resource: "products",
                                        id: getValue() as string,
                                    });
                                }}
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const { edit, show, create } = useNavigation();

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: { filters, setCurrent, setFilters },
        getState,
        setPageIndex,
        getCanPreviousPage,
        getPageCount,
        getCanNextPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable({
        columns,
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
        },
    }));

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Products</h1>
                <button
                    className="btn btn-sm btn-primary normal-case font-normal text-zinc-50"
                    onClick={() => create("products")}
                >
                    <CreateIcon />
                    Create
                </button>
            </div>
            <div className="overflow-x-auto bg-slate-50 border">
                <div className="flex justify-between items-center m-4">
                    <button
                        className="btn btn-outline btn-primary btn-sm normal-case font-light"
                        onClick={() => {
                            setCurrent(1);
                            setFilters([], "replace");
                            filterForm?.current?.reset();
                        }}
                    >
                        <FilterIcon />
                        Clear
                    </button>
                    <div className="flex justify-end items-center">
                        <form ref={filterForm}>
                            <input
                                className="input input-bordered input-sm"
                                type="search"
                                value={getDefaultFilter("q", filters)}
                                onChange={(e) => {
                                    setCurrent(1);
                                    setFilters([
                                        {
                                            field: "q",
                                            value: e.target.value,
                                            operator: "contains",
                                        },
                                    ]);
                                }}
                                placeholder="Search with keywords"
                            />
                        </form>
                    </div>
                </div>
                <table className="table table-zebra border-t">
                    <thead className="bg-slate-200">
                        {getHeaderGroups()?.map((headerGroup) => (
                            <tr key={headerGroup?.id}>
                                {headerGroup?.headers?.map((header) => (
                                    <th
                                        className="text-center"
                                        key={header?.id}
                                        onClick={header?.column?.getToggleSortingHandler()}
                                    >
                                        <div className="flex justify-center items-center">
                                            {!header?.isPlaceholder &&
                                                flexRender(
                                                    header?.column?.columnDef
                                                        ?.header,
                                                    header?.getContext(),
                                                )}
                                            {{
                                                asc: <AscIcon />,
                                                desc: <DescIcon />,
                                            }[
                                                header?.column?.getIsSorted() as string
                                            ] ?? null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel()?.rows?.map((row) => (
                            <tr key={row?.id}>
                                {row?.getVisibleCells()?.map((cell) => (
                                    <td key={cell?.id}>
                                        {flexRender(
                                            cell?.column?.columnDef?.cell,
                                            cell?.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center mt-3">
                <div className="join">
                    <button
                        className="join-item btn btn-sm btn-ghost"
                        onClick={() => setPageIndex(0)}
                        disabled={!getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="join-item btn btn-sm btn-ghost"
                        onClick={() => previousPage()}
                        disabled={!getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    {Array.from(
                        { length: getPageCount() },
                        (_, index) => index + 1,
                    )?.map((pageNumber) => {
                        const btnActive =
                            pageNumber - 1 == getState()?.pagination?.pageIndex
                                ? " btn-active"
                                : "";
                        return (
                            <button
                                key={pageNumber}
                                className={"join-item btn btn-sm" + btnActive}
                                onClick={() => setPageIndex(pageNumber - 1)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    <button
                        className="join-item btn btn-sm btn-ghost"
                        onClick={() => nextPage()}
                        disabled={!getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="join-item btn btn-sm btn-ghost"
                        onClick={() => setPageIndex(getPageCount() - 1)}
                        disabled={!getCanNextPage()}
                    >
                        {">>"}
                    </button>
                </div>
                <select
                    className="mx-2 p-1 border rounded"
                    value={getState()?.pagination?.pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 25, 50].map((pageSize) => (
                        <option
                            className="border rounded"
                            key={pageSize}
                            value={pageSize}
                        >
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
