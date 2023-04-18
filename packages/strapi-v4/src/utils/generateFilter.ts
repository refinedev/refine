import { CrudFilters, LogicalFilter } from "@refinedev/core";
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

export const generateFilter = (filters?: CrudFilters) => {
    let rawQuery = "";

    if (filters) {
        filters.map((filter) => {
            if (
                filter.operator !== "or" &&
                filter.operator !== "and" &&
                "field" in filter
            ) {
                const { field, operator, value } = filter;

                const mapedOperator = mapOperator(operator);

                if (Array.isArray(value)) {
                    value.map((val, index) => {
                        rawQuery += `&filters${generateNestedFilterField(
                            field,
                        )}[$${mapedOperator}][${index}]=${val}`;
                    });
                } else {
                    rawQuery += `&filters${generateNestedFilterField(
                        field,
                    )}[$${mapedOperator}]=${value}`;
                }
            } else {
                const { value } = filter;

                value.map((item, index) => {
                    const { field, operator, value } = item as LogicalFilter;

                    const mapedOperator = mapOperator(operator);

                    rawQuery += `&filters[$${
                        filter.operator
                    }][${index}]${generateNestedFilterField(
                        field,
                    )}[$${mapedOperator}]=${value}`;
                });
            }
        });
    }

    const parsedQuery = parse(rawQuery);
    const queryFilters = stringify(parsedQuery, { encodeValuesOnly: true });

    return queryFilters;
};
