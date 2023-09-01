import React from "react";
import {
    IResourceComponentsProps,
    getDefaultFilter,
    useDelete,
    useNavigation,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    EditIcon,
    ShowIcon,
    DeleteIcon,
    CreateIcon,
    FilterIcon,
    AscIcon,
    DescIcon,
} from "../../components/icons";
import { ICategory } from "../../interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const { mutate: deleteCategory } = useDelete<ICategory>();
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "Id",
            },
            {
                id: "title",
                accessorKey: "title",
                header: "Name",
                cell: function render({ getValue }) {
                    return (
                        <div className="w-24 md:w-60 lg:w-96 text-center">
                            {getValue() as string}
                        </div>
                    );
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <div className="flex justify-around items-center">
                            <button
                                className="btn btn-xs btn-circle btn-ghost m-1"
                                onClick={() => {
                                    edit("categories", getValue() as string);
                                }}
                            >
                                <EditIcon />
                            </button>
                            <button
                                className="btn btn-xs btn-circle btn-ghost m-1"
                                onClick={() => {
                                    show("categories", getValue() as string);
                                }}
                            >
                                <ShowIcon />
                            </button>
                            <button
                                className="btn btn-xs btn-circle btn-ghost m-1"
                                onClick={() => {
                                    deleteCategory({
                                        resource: "categories",
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
        refineCore: { setCurrent, filters, setFilters },
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
                <h1 className="page-title">Categories</h1>
                <button
                    className="btn btn-sm btn-primary normal-case font-normal text-zinc-50"
                    onClick={() => create("categories")}
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
                        }}
                    >
                        <FilterIcon />
                        Clear
                    </button>
                    <div className="flex justify-end items-center">
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
                    </div>
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
                                <td className="text-center" key={cell?.id}>
                                    <div className="flex justify-center items-center">
                                        {flexRender(
                                            cell?.column?.columnDef?.cell,
                                            cell?.getContext(),
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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
