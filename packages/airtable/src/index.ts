import {
    DataProvider,
    CrudFilters,
    CrudSorting,
    LogicalFilter,
} from "@pankod/refine-core";
import { compile, Formula } from "@qualifyze/airtable-formulator";

import Airtable from "airtable";
import { AirtableBase } from "airtable/lib/airtable_base";

const generateSort = (sort?: CrudSorting) => {
    return sort?.map((item) => ({
        field: item.field,
        direction: item.order,
    }));
};

type SimpleOperators = "eq" | "ne" | "lt" | "lte" | "gt" | "gte";

const simpleOperatorMapping: Record<SimpleOperators, string> = {
    eq: "=",
    ne: "!=",
    lt: "<",
    lte: "<=",
    gt: ">",
    gte: ">=",
} as const;

const isSimpleOperator = (operator: any): operator is SimpleOperators =>
    Object.keys(simpleOperatorMapping).includes(operator);

const isContainssOperator = (
    operator: any,
): operator is "containss" | "ncontainss" =>
    ["containss", "ncontainss"].includes(operator);

const isContainsOperator = (
    operator: any,
): operator is "contains" | "ncontains" =>
    ["contains", "ncontains"].includes(operator);

const generateLogicalFilterFormula = (filter: LogicalFilter): Formula => {
    const { field, operator, value } = filter;

    if (isSimpleOperator(operator)) {
        return [simpleOperatorMapping[operator], { field }, value];
    }

    if (isContainssOperator(operator)) {
        const mappedOperator = {
            containss: "!=",
            ncontainss: "=",
        }[operator];

        return [mappedOperator, ["FIND", value, { field }], 0];
    }

    if (isContainsOperator(operator)) {
        const mappedOperator = {
            contains: "!=",
            ncontains: "=",
        }[operator];

        const find = [
            "FIND",
            ["LOWER", value],
            ["LOWER", { field }],
        ] as Formula;

        return [mappedOperator, find, 0];
    }

    if (operator === "null") {
        return ["=", { field }, ["BLANK"]];
    }

    if (operator === "nnull") {
        return ["!=", { field }, ["BLANK"]];
    }

    throw Error(
        `Operator ${operator} is not supported for the Airtable data provider`,
    );
};

const generateFilterFormula = (filters: CrudFilters): Formula[] => {
    const compound = filters.map((filter): Formula => {
        const { operator, value } = filter;

        if (operator === "or") {
            return ["OR", ...generateFilterFormula(value)];
        }

        return generateLogicalFilterFormula(filter);
    });

    return compound;
};

const generateFilter = (filters?: CrudFilters): string | undefined => {
    if (filters) {
        // Top-level array has an implicit AND as per CRUDFilter design - https://refine.dev/docs/guides-and-concepts/data-provider/handling-filters/#logicalfilters
        return compile(["AND", ...generateFilterFormula(filters)]);
    }

    return undefined;
};

const AirtableDataProvider = (
    apiKey: string,
    baseId: string,
    airtableClient?: AirtableBase,
): DataProvider => {
    const base =
        airtableClient || new Airtable({ apiKey: apiKey }).base(baseId);

    return {
        getList: async ({
            resource,
            hasPagination = true,
            pagination = { current: 1, pageSize: 10 },
            sort,
            filters,
        }) => {
            const { current = 1, pageSize = 10 } = pagination ?? {};

            const generetedSort = generateSort(sort) || [];
            const queryFilters = generateFilter(filters);

            const { all } = base(resource).select({
                pageSize: 100,
                sort: generetedSort,
                ...(queryFilters ? { filterByFormula: queryFilters } : {}),
            });

            const data = await all();

            return {
                data: data
                    .slice(
                        hasPagination ? (current - 1) * pageSize : undefined,
                        hasPagination ? current * pageSize : undefined,
                    )
                    .map((p) => ({
                        id: p.id,
                        ...p.fields,
                    })) as any,
                total: data.length,
            };
        },

        getMany: async ({ resource, ids }) => {
            const { all } = base(resource).select({
                pageSize: 100,
            });

            const data = await all();

            return {
                data: data
                    .filter((p) => ids.includes(p.id))
                    .map((p) => ({
                        id: p.id,
                        ...p.fields,
                    })) as any,
            };
        },

        create: async ({ resource, variables }) => {
            const { id, fields } = await base(resource).create(variables);

            return {
                data: {
                    id: id,
                    ...fields,
                } as any,
            };
        },

        createMany: async ({ resource, variables }) => {
            const data = await base(resource).create(variables);

            return {
                data: data.map((p) => ({
                    id: p.id,
                    ...p.fields,
                })) as any,
            };
        },

        update: async ({ resource, id, variables }) => {
            const { fields } = await base(resource).update(
                id.toString(),
                variables,
            );

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        updateMany: async ({ resource, ids, variables }) => {
            const requestParams = ids.map((id) => ({
                id: id.toString(),
                fields: { ...variables },
            }));
            const data = await base(resource).update(requestParams);

            return {
                data: data.map((p) => ({
                    id: p.id,
                    ...p.fields,
                })) as any,
            };
        },

        getOne: async ({ resource, id }) => {
            const { fields } = await base(resource).find(id.toString());

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        deleteOne: async ({ resource, id }) => {
            const { fields } = await base(resource).destroy(id.toString());

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        deleteMany: async ({ resource, ids }) => {
            const data = await base(resource).destroy(ids.map(String));

            return {
                data: data.map((p) => ({
                    id: p.id,
                    ...p.fields,
                })) as any,
            };
        },

        getApiUrl: () => {
            throw Error("Not implemented on refine-airtable data provider.");
        },

        custom: async () => {
            throw Error("Not implemented on refine-airtable data provider.");
        },
    };
};

export default AirtableDataProvider;
