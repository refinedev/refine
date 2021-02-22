import { Children } from "react";

import { ColumnProps } from "@components";
import { Sort, Filters } from "@interfaces";

export const getDefaultSortOrder = (children: any): Sort => {
    const cols: Sort = [];

    Children.forEach(children, (column) => {
        const { props }: { props: ColumnProps } = column;

        if (props.defaultSortOrder) {
            cols.push({
                field: props.dataIndex,
                order: props.defaultSortOrder,
            });
        }
    });

    return cols;
};

export const getDefaultFilteredValue = (children: any): Filters => {
    const filters: Filters = {};

    Children.forEach(children, (column) => {
        const { props }: { props: ColumnProps } = column;

        if (props.defaultFilteredValue) {
            filters[props.dataIndex as string] = props.defaultFilteredValue;
        }
    });

    return filters;
};
