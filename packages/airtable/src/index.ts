import { DataProvider } from "@pankod/refine";
import { CrudSorting } from "@pankod/refine/dist/interfaces";
import Airtable from "airtable";
import { AirtableBase } from "airtable/lib/airtable_base";

const generateSort = (sort?: CrudSorting) => {
    return sort?.map((item) => ({
        field: item.field,
        direction: item.order,
    }));
};

const AirtableDataProvider = (
    apiKey: string,
    baseId: string,
    airtableClient?: AirtableBase,
): DataProvider => {
    const base =
        airtableClient || new Airtable({ apiKey: apiKey }).base(baseId);

    return {
        getList: async (resource, params) => {
            const current = params.pagination?.current || 1;
            const pageSize = params.pagination?.pageSize || 10;

            const sort = generateSort(params.sort) || [];

            const { all } = base(resource).select({
                pageSize: 100,
                sort,
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

        getMany: async (resource, params) => {
            const { ids } = params;

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

        create: async (resource, params) => {
            const { variables } = params;

            const { id, fields } = await base(resource).create(variables);

            return {
                data: {
                    id: id,
                    ...fields,
                } as any,
            };
        },

        createMany: async (resource, params) => {
            const { variables } = params;

            const data = await base(resource).create(variables);

            return {
                data: data.map((p) => ({
                    id: p.id,
                    ...p.fields,
                })) as any,
            };
        },

        update: async (resource, params) => {
            const { id, variables } = params;

            const { fields } = await base(resource).update(id, variables);

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        updateMany: async (resource, params) => {
            const { ids, variables } = params;

            const requestParams = ids.map((id) => ({
                id,
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

        getOne: async (resource, params) => {
            const { id } = params;

            const { fields } = await base(resource).find(id);

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        deleteOne: async (resource, params) => {
            const { id } = params;

            const { fields } = await base(resource).destroy(id);

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        deleteMany: async (resource, params) => {
            const { ids } = params;

            const data = await base(resource).destroy(ids);

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
