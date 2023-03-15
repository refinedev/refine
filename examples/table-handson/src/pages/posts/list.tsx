import React from "react";
import {
    IResourceComponentsProps,
    useTable,
    useUpdate,
    useSelect,
} from "@refinedev/core";
import { isEqual } from "lodash";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";

import { ICategory, IPost } from "../../interfaces";

type Config = {
    column: number;
    sortOrder: "asc" | "desc";
};

type localCompareResult = -1 | 0 | 1;

export const PostList: React.FC<IResourceComponentsProps> = () => {
    registerAllModules();

    const hotTableRef = React.useRef<HotTable>(null);

    const [initialConfig, setInitialConfig] = React.useState<Config | Config[]>(
        {
            column: 0,
            sortOrder: "asc",
        },
    );

    const {
        tableQueryResult: { data: { data } = { data: [] } },
    } = useTable<IPost>({
        resource: "posts",
        hasPagination: false,
    });

    const categoryIds = new Set(data?.map((post) => post.category.id) ?? []);
    const { mutate } = useUpdate();

    const { options } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: [...categoryIds],
    });

    const updateRow = (row: number, field: string, value: string) => {
        if (data) {
            const [id] =
                hotTableRef.current?.hotInstance?.getDataAtRow(row) ?? [];

            const original = data.find((post) => post.id === id);

            let values: Partial<IPost> = {
                ...original,
                [field]: value,
            };

            if (field === "category.id") {
                values = {
                    ...values,
                    category: {
                        id: Number(value),
                    },
                };
            }

            mutate({
                resource: "posts",
                id,
                values,
            });
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <HotTable
                licenseKey="non-commercial-and-evaluation"
                ref={hotTableRef}
                data={data}
                columnSorting={{
                    sortEmptyCells: true,
                    initialConfig,
                }}
                columns={[
                    {
                        data: "id",
                        title: "ID",
                        readOnly: true,
                        width: 50,
                        className: "htCenter",
                    },
                    {
                        data: "title",
                        title: "Title",
                        type: "text",
                        width: 300,
                    },
                    {
                        data: "category.id",
                        title: "Category",
                        editor: "select",
                        width: 200,

                        renderer: (_instance, td, _row, _col, _prop, value) => {
                            const category = options.find(
                                (option) => option.value == value,
                            );

                            td.innerText = category?.label ?? "";
                            return td;
                        },
                        selectOptions: Object.fromEntries(
                            options.map((option) => [
                                option.value,
                                option.label,
                            ]),
                        ),
                        columnSorting: {
                            compareFunctionFactory(sortOrder) {
                                return (a, b) => {
                                    const optionA =
                                        options.find(
                                            (option) => option.value == a,
                                        )?.label ?? "";
                                    const optionB =
                                        options.find(
                                            (option) => option.value == b,
                                        )?.label ?? "";
                                    return sortOrder === "asc"
                                        ? (optionA.localeCompare(
                                              optionB,
                                          ) as localCompareResult)
                                        : (optionB.localeCompare(
                                              optionA,
                                          ) as localCompareResult);
                                };
                            },
                        },
                    },
                    {
                        data: "status",
                        title: "Status",
                        editor: "select",
                        selectOptions: ["draft", "published", "rejected"],
                        width: 200,
                    },
                ]}
                afterChange={(changes, source) => {
                    if (changes && source !== "loadData") {
                        changes.forEach(([row, field, prev, next]) => {
                            if (prev.toString() !== next.toString()) {
                                updateRow(row, field as string, next);
                            }
                        });
                    }
                }}
                fillHandle="vertical"
                afterColumnSort={(
                    _currentSortConfig,
                    destinationSortConfigs,
                ) => {
                    if (!isEqual(destinationSortConfigs, initialConfig))
                        setInitialConfig(destinationSortConfigs);
                }}
            />
        </div>
    );
};
