import { gql, type OperationResult } from "@urql/core";
import type {
  BaseRecord,
  CreateManyParams,
  DeleteManyParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateManyParams,
  DataProvider,
  CustomParams,
  CreateParams,
  UpdateParams,
} from "@refinedev/core";
import camelcase from "camelcase";
import { singular } from "pluralize";

import {
  buildFilters,
  buildPagination,
  buildSorters,
  getOperationFields,
} from "../utils";

export type GraphQLDataProviderOptions = typeof defaultOptions;

export const defaultOptions = {
  create: {
    dataMapper: (response: OperationResult<any>, params: CreateParams<any>) => {
      const key = `createOne${camelcase(singular(params.resource), {
        pascalCase: true,
      })}`;

      return response.data?.[key];
    },
    buildVariables: (params: CreateParams<any>) => {
      return {
        input: {
          [singular(params.resource)]:
            params.variables ?? params?.meta?.gqlVariables,
        },
      };
    },
  },
  createMany: {
    dataMapper: (
      response: OperationResult<any>,
      params: CreateManyParams<any>,
    ) => {
      const key = `createMany${camelcase(params.resource, {
        pascalCase: true,
      })}`;

      return response.data?.[key];
    },
    buildVariables: (params: CreateManyParams<any>) => {
      return {
        input: {
          [camelcase(params.resource)]: params.variables,
        },
      };
    },
  },
  getOne: {
    dataMapper: (response: OperationResult<any>, params: GetOneParams) => {
      const key = camelcase(singular(params.resource));

      return response.data?.[key];
    },
    buildVariables: (params: GetOneParams) => {
      return {
        id: params.id,
      };
    },
    // Besides useOne hook, getOne hook is also consumed by `useForm`.
    // useForm hook has an optional gqlQuery field, we may only get `gqlMutation`.
    // For this reason, we need to convert mutation to query to get initial data on edit.
    convertMutationToQuery: (params: GetOneParams) => {
      const { resource, meta } = params;
      const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

      if (!gqlOperation) {
        throw new Error("Operation is required.");
      }

      const stringFields = getOperationFields(gqlOperation);

      const pascalCaseOperation = camelcase(singular(resource), {
        pascalCase: true,
      });

      const operation = camelcase(singular(resource));

      const query = gql`
        query Get${pascalCaseOperation}($id: ID!) {
          ${operation}(id: $id) {
            ${stringFields}
          }
        }
      `;

      return query;
    },
  },
  getList: {
    dataMapper: (response: OperationResult<any>, params: GetListParams) => {
      return response.data?.[params.resource].nodes;
    },
    countMapper: (response: OperationResult<any>, params: GetListParams) => {
      return response.data?.[params.resource].totalCount;
    },
    buildSorters: (params: GetListParams) => buildSorters(params.sorters),
    buildFilters: (params: GetListParams) => buildFilters(params.filters),
    buildPagination: (params: GetListParams) =>
      buildPagination(params.pagination),
  },
  getMany: {
    buildFilter: (params: GetManyParams) => {
      return { id: { in: params.ids } };
    },
    dataMapper: (response: OperationResult<any>, params: GetManyParams) => {
      const key = camelcase(params.resource);

      return response.data?.[key].nodes;
    },
  },
  update: {
    dataMapper: (
      response: OperationResult<any>,
      params: DataProvider["update"]["arguments"],
    ) => {
      const key = `updateOne${camelcase(singular(params.resource), {
        pascalCase: true,
      })}`;

      return response.data?.[key];
    },
    buildVariables: (params: UpdateParams<any>) => {
      return {
        input: {
          id: params.id,
          update: params.variables,
          ...params.meta?.gqlVariables,
        },
      };
    },
  },
  updateMany: {
    dataMapper: (
      response: OperationResult<any>,
      params: UpdateManyParams<any>,
    ) => {
      const pascalResource = camelcase(params.resource, {
        pascalCase: true,
      });

      const key = `updateMany${pascalResource}`;
      return response.data?.[key];
    },
    buildVariables: (params: UpdateManyParams<any>) => {
      const { ids, variables } = params;

      return {
        input: {
          filter: { id: { in: ids } },
          update: variables,
          ...params.meta?.gqlVariables,
        },
      };
    },
  },
  deleteOne: {
    dataMapper: (
      response: OperationResult<any>,
      params: DataProvider["deleteOne"]["arguments"],
    ) => {
      const pascalResource = camelcase(singular(params.resource), {
        pascalCase: true,
      });

      const key = `deleteOne${pascalResource}`;

      return response.data?.[key];
    },
    buildVariables: (params: DataProvider["deleteOne"]["arguments"]) => {
      return {
        input: { id: params.id },
      };
    },
  },
  deleteMany: {
    dataMapper: (
      response: OperationResult<any>,
      params: DeleteManyParams<any>,
    ) => {
      const pascalResource = camelcase(params.resource, {
        pascalCase: true,
      });

      const key = `deleteMany${pascalResource}`;

      return response.data?.[key];
    },
    buildVariables: (params: DeleteManyParams<any>) => {
      const { ids } = params;

      return {
        input: {
          filter: {
            id: { in: ids },
          },
          ...params.meta?.gqlVariables,
        },
      };
    },
  },
  custom: {
    dataMapper: (response: OperationResult<any>, params: CustomParams) =>
      response.data ?? response.error?.message,
    buildVariables: (params: CustomParams) => ({
      ...params?.meta?.variables,
      ...params?.meta?.gqlVariables,
    }),
  },
};
