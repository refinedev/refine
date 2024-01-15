import { ConditionalFilter, CrudFilters, LogicalFilter } from "@refinedev/core";
import { mapOperator } from "./mapOperator";
import { stringify, parse } from "qs";

export const generateNestedFilterField = (field: string) => {
    const fields = field.split(".");

    if (fields.length > 1) {
        let fieldQuery = "";
        fields.map((v) => (fieldQuery += `[${v}]`));
        return fieldQuery;
    } else {
        return `[${fields[0]}]`;
    }
};

const generateLogicalFilter = (filter: LogicalFilter, parent = ""): string => {
    let rawQuery = "";
    const { field, operator, value } = filter;

    const mapedOperator = mapOperator(operator);

    if (Array.isArray(value)) {
        value.map((val, index) => {
            rawQuery +=
                "&filters" +
                parent +
                `${generateNestedFilterField(
                    field,
                )}[$${mapedOperator}][${index}]=${val}`;
        });
    } else {
        rawQuery +=
            "&filters" +
            parent +
            `${generateNestedFilterField(field)}[$${mapedOperator}]=${value}`;
    }
    return rawQuery;
};

const generateConditionalFilter = (
    filter: ConditionalFilter,
    parent = "",
): string => {
    let rawQuery = "";
    filter.value.map((item, index) => {
        //The value can be a logical filter or a conditional filter
        if (
            item.operator !== "or" &&
            item.operator !== "and" &&
            "field" in item
        ) {
            rawQuery += generateLogicalFilter(
                item,
                parent + `[$${filter.operator}][${index}]`,
            );
        } else {
            // The value is a conditional filter
            rawQuery += generateConditionalFilter(
                item,
                parent + `[$${filter.operator}][${index}]`,
            );
        }
    });
    return rawQuery;
};

export const generateFilter = (filters?: CrudFilters) => {
    let rawQuery = "";

    if (filters) {
        filters.map((filter, indx) => {
            // Checking if the filter is a logical filter or a conditional filter
            if (
                filter.operator !== "or" &&
                filter.operator !== "and" &&
                "field" in filter
            ) {
                // The filter is a logical filter
                rawQuery += generateLogicalFilter(filter);
            } else {
                // the filter is a conditional filter
                rawQuery += generateConditionalFilter(filter);
            }
        });
    }

    console.log(rawQuery);
    const parsedQuery = parse(rawQuery);
    const queryFilters = stringify(parsedQuery, { encodeValuesOnly: true });

    return queryFilters;
};
