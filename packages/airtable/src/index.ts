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
        getList: async ({ resource, pagination, sort }) => {
            const current = pagination?.current || 1;
            const pageSize = pagination?.pageSize || 10;

            const generetedSort = generateSort(sort) || [];

            const { all } = base(resource).select({
                pageSize: 100,
                sort: generetedSort,
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
            const { fields } = await base(resource).update(id, variables);

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        updateMany: async ({ resource, ids, variables }) => {
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

        getOne: async ({ resource, id }) => {
            const { fields } = await base(resource).find(id);

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        deleteOne: async ({ resource, id }) => {
            const { fields } = await base(resource).destroy(id);

            return {
                data: {
                    id,
                    ...fields,
                } as any,
            };
        },

        deleteMany: async ({ resource, ids }) => {
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
