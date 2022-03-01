import { DataProvider } from "@pankod/refine-core";
import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
} from "@pankod/refine-core/dist/interfaces";
import { compile, Formula } from "@qualifyze/airtable-formulator";

import Airtable from "airtable";
import { AirtableBase } from "airtable/lib/airtable_base";

const generateSort = (sort?: CrudSorting) => {
    return sort?.map((item) => ({
        field: item.field,
        direction: item.order,
    }));
};

const simpleOperators: Partial<Record<CrudOperators, string>> = {
    eq: "=",
    ne: "!=",
    lt: "<",
    lte: "<=",
    gt: ">",
    gte: ">=",
};

const generateFilter = (filters?: CrudFilters): string | undefined => {
    if (filters) {
        const parsedFilter = filters.map(
            ({ field, operator, value }): Formula => {
                if (Object.keys(simpleOperators).includes(operator)) {
                    const mappedOperator =
                        simpleOperators[
                            operator as keyof typeof simpleOperators
                        ];

                    return [mappedOperator as string, { field }, value];
                }

                if (["containss", "ncontainss"].includes(operator)) {
                    const mappedOperator = {
                        containss: "!=",
                        ncontainss: "=",
                    }[operator as "containss" | "ncontainss"];

                    return [mappedOperator, ["FIND", value, { field }], 0];
                }

                if (["contains", "ncontains"].includes(operator)) {
                    const mappedOperator = {
                        contains: "!=",
                        ncontains: "=",
                    }[operator as "contains" | "ncontains"];

                    const find = [
                        "FIND",
                        ["LOWER", value],
                        ["LOWER", { field }],
                    ] as Formula;

                    return [mappedOperator, find, 0];
                }

                if (operator === "null") {
                    if (typeof value !== "boolean")
                        throw new Error(
                            "Value must be a boolean for the null operator",
                        );

                    return [value ? "=" : "!=", { field }, ["BLANK"]];
                }

                throw Error(`Operator ${operator} is not supported`);
            },
        );

        return compile(["AND", ...parsedFilter]);
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
        getList: async ({ resource, pagination, sort, filters }) => {
            const current = pagination?.current || 1;
            const pageSize = pagination?.pageSize || 10;

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
                    .slice((current - 1) * pageSize, current * pageSize)
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
