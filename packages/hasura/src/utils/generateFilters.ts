import { CrudFilter, CrudFilters, CrudOperators } from "@refinedev/core";
import camelcase from "camelcase";
import setWith from "lodash/setWith";
import { NamingConvention } from "src/dataProvider";

export type HasuraFilterCondition =
    | "_and"
    | "_not"
    | "_or"
    | "_eq"
    | "_gt"
    | "_gte"
    | "_lt"
    | "_lte"
    | "_neq"
    | "_in"
    | "_nin"
    | "_like"
    | "_nlike"
    | "_ilike"
    | "_nilike"
    | "_is_null"
    | "_similar"
    | "_nsimilar"
    | "_regex"
    | "_iregex";

const hasuraFilters: Record<CrudOperators, HasuraFilterCondition | undefined> =
    {
        eq: "_eq",
        ne: "_neq",
        lt: "_lt",
        gt: "_gt",
        lte: "_lte",
        gte: "_gte",
        in: "_in",
        nin: "_nin",
        contains: "_ilike",
        ncontains: "_nilike",
        containss: "_like",
        ncontainss: "_nlike",
        null: "_is_null",
        or: "_or",
        and: "_and",
        between: undefined,
        nbetween: undefined,
        nnull: "_is_null",
        startswith: "_iregex",
        nstartswith: "_iregex",
        endswith: "_iregex",
        nendswith: "_iregex",
        startswiths: "_similar",
        nstartswiths: "_nsimilar",
        endswiths: "_similar",
        nendswiths: "_nsimilar",
    };

export const handleFilterValue = (operator: CrudOperators, value: any) => {
    switch (operator) {
        case "startswiths":
        case "nstartswiths":
            return `${value}%`;
        case "endswiths":
        case "nendswiths":
            return `%${value}`;
        case "startswith":
            return `^${value}`;
        case "nstartswith":
            return `^(?!${value})`;
        case "endswith":
            return `${value}$`;
        case "nendswith":
            return `(?<!${value})$`;
        case "nnull":
            return false;
        case "contains":
        case "containss":
        case "ncontains":
        case "ncontainss":
            return `%${value}%`;
        default:
            return value;
    }
};

const convertHasuraOperatorToGraphqlDefaultNaming = (
    hasuraOperator?: HasuraFilterCondition,
) => {
    return hasuraOperator ? `_${camelcase(hasuraOperator)}` : undefined;
};

export const generateNestedFilterQuery = (
    filter: CrudFilter,
    namingConvention: NamingConvention = "hasura-default",
): any => {
    const { operator } = filter;

    if (operator !== "or" && operator !== "and" && "field" in filter) {
        const { field, value } = filter;

        const defaultNamingConvention = namingConvention === "hasura-default";
        const hasuraOperator = defaultNamingConvention
            ? hasuraFilters[filter.operator]
            : convertHasuraOperatorToGraphqlDefaultNaming(
                  hasuraFilters[filter.operator],
              );
        if (!hasuraOperator) {
            throw new Error(`Operator ${operator} is not supported`);
        }

        const fieldsArray = field.split(".");
        const fieldsWithOperator = [...fieldsArray, hasuraOperator];
        const filteredValue = handleFilterValue(operator, value);

        return {
            ...setWith({}, fieldsWithOperator, filteredValue, Object),
        };
    }

    return {
        [`_${operator}`]: filter.value.map((f) =>
            generateNestedFilterQuery(f, namingConvention),
        ),
    };
};

export const generateFilters: any = (
    filters?: CrudFilters,
    namingConvention: NamingConvention = "hasura-default",
) => {
    if (!filters) {
        return undefined;
    }

    const nestedQuery = generateNestedFilterQuery(
        {
            operator: "and",
            value: filters,
        },
        namingConvention,
    );

    return nestedQuery;
};
