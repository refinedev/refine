import type { BaseRecord, CustomParams, DataProvider } from "@refinedev/core";
import type { Client } from "@urql/core";
import { isMutation } from "../utils";
import { defaultOptions, type GraphQLDataProviderOptions } from "./options";
import dm from "deepmerge";

const createDataProvider = (
  client: Client,
  baseOptions: GraphQLDataProviderOptions = defaultOptions,
): Required<DataProvider> => {
  const options = dm(defaultOptions, baseOptions);

  return {
    create: async (params) => {
      const { meta } = params;

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (!gqlOperation) {
        throw new Error("Operation is required.");
      }

      const response = await client
        .mutation(gqlOperation, options.create.buildVariables(params))
        .toPromise();

      const data = options.create.dataMapper(response, params);

      return {
        data,
      };
    },
    createMany: async (params) => {
      const { meta } = params;

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (!gqlOperation) {
        throw new Error("Operation is required.");
      }

      const response = await client.mutation<BaseRecord>(
        gqlOperation,
        options.createMany.buildVariables(params),
      );

      return {
        data: options.createMany.dataMapper(response, params),
      };
    },
    getOne: async (params) => {
      const { id, meta } = params;

      const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

      if (!gqlOperation) {
        throw new Error("Operation is required.");
      }

      let query = gqlOperation;

      if (isMutation(gqlOperation)) {
        query = options.getOne.convertMutationToQuery(params);
      }

      const response = await client
        .query(query, options.getOne.buildVariables(params))
        .toPromise();

      return {
        data: options.getOne.dataMapper(response, params),
      };
    },
    getList: async (params) => {
      const { meta } = params;

      if (!meta?.gqlQuery) {
        throw new Error("Operation is required.");
      }

      const variables = options.getList.buildVariables(params);

      const response = await client.query(meta.gqlQuery, variables).toPromise();

      return {
        data: options.getList.dataMapper(response, params),
        total: options.getList.getTotalCount(response, params),
      };
    },
    getMany: async (params) => {
      const { meta } = params;

      if (!meta?.gqlQuery) {
        throw new Error("Operation is required.");
      }

      const response = await client
        .query(meta.gqlQuery, { filter: options.getMany.buildFilter(params) })
        .toPromise();

      return {
        data: options.getMany.dataMapper(response, params),
      };
    },
    update: async (params) => {
      const { meta } = params;
      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (!gqlOperation) {
        throw new Error("Operation is required.");
      }

      const response = await client
        .mutation(gqlOperation, options.update.buildVariables(params))
        .toPromise();

      return {
        data: options.update.dataMapper(response, params),
      };
    },
    updateMany: async (params) => {
      const { meta } = params;

      if (!meta?.gqlMutation) {
        throw new Error("Operation is required.");
      }

      const response = await client
        .mutation(meta.gqlMutation, options.updateMany.buildVariables(params))
        .toPromise();

      return { data: options.updateMany.dataMapper(response, params) };
    },
    deleteOne: async (params) => {
      const { meta } = params;

      if (!meta?.gqlMutation) {
        throw new Error("Operation is required.");
      }

      const response = await client
        .mutation(meta.gqlMutation, options.deleteOne.buildVariables(params))
        .toPromise();

      return {
        data: options.deleteOne.dataMapper(response, params),
      };
    },
    deleteMany: async (params) => {
      const { meta } = params;

      if (!meta?.gqlMutation) {
        throw new Error("Operation is required.");
      }

      const response = await client
        .mutation(meta.gqlMutation, options.deleteMany.buildVariables(params))
        .toPromise();

      return {
        data: options.deleteMany.dataMapper(response, params),
      };
    },
    custom: async (params) => {
      const { meta } = params;

      const url = params.url !== "" ? params.url : undefined;

      if (!meta?.gqlMutation && !meta?.gqlQuery) {
        throw new Error("Operation is required.");
      }

      if (meta?.gqlMutation) {
        const response = await client
          .mutation(
            meta.gqlMutation,
            options.custom.buildVariables(params),
            JSON.parse(JSON.stringify({ url })),
          )
          .toPromise();

        return { data: options.custom.dataMapper(response, params) };
      }

      const response = await client
        .query(
          meta.gqlQuery!,
          options.custom.buildVariables(params),
          JSON.parse(JSON.stringify({ url })),
        )
        .toPromise();

      return { data: options.custom.dataMapper(response, params) };
    },
    getApiUrl: () => {
      throw Error("Not implemented on refine-graphql data provider.");
    },
  };
};

export default createDataProvider;
