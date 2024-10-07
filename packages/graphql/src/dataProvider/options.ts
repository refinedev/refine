import type {
  BaseRecord,
  CreateManyParams,
  DeleteManyParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateManyParams,
  DataProvider,
} from "@refinedev/core";
import camelcase from "camelcase";
import { singular } from "pluralize";
import {
  buildFilters,
  buildPagination,
  buildSorters,
  getOperationFields,
} from "../utils";
import { gql } from "@urql/core";

export type GraphQLDataProviderOptions = typeof defaultOptions;

export const defaultOptions = {
  create: {
    dataMapper: (
      response: BaseRecord,
      params: DataProvider["create"]["arguments"],
    ) => {
      const key = `createOne${camelcase(singular(params.resource), {
        pascalCase: true,
      })}`;

      return response.data[key];
    },
    buildVariables: (params: DataProvider["create"]["arguments"]) => {
      return {
        input: { [singular(params.resource)]: params.variables },
      };
    },
  },
  createMany: {
    dataMapper: (response: BaseRecord, params: CreateManyParams<any>) => {
      const key = `createMany${camelcase(params.resource, {
        pascalCase: true,
      })}`;

      return response.data[key];
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
    dataMapper: (response: BaseRecord, params: GetOneParams) => {
      const key = camelcase(singular(params.resource));

      return response.data[key];
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
    dataMapper: (response: BaseRecord, params: GetListParams) => {
      return response.data[params.resource].nodes;
    },
    countMapper: (response: BaseRecord, params: GetListParams) => {
      return response.data[params.resource].totalCount;
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
    dataMapper: (response: BaseRecord, params: GetManyParams) => {
      const key = camelcase(params.resource);

      return response.data[key].nodes;
    },
  },
  update: {
    dataMapper: (
      response: BaseRecord,
      params: DataProvider["update"]["arguments"],
    ) => {
      const key = `updateOne${camelcase(singular(params.resource), {
        pascalCase: true,
      })}`;

      return response.data[key];
    },
    buildVariables: (params: DataProvider["update"]["arguments"]) => {
      return {
        id: params.id,
        update: params.variables,
      };
    },
  },
  updateMany: {
    dataMapper: (response: BaseRecord, params: UpdateManyParams<any>) => {
      const pascalResource = camelcase(params.resource, {
        pascalCase: true,
      });

      const key = `updateMany${pascalResource}`;
      return response.data[key];
    },
    buildVariables: (params: UpdateManyParams<any>) => {
      const { ids, variables } = params;

      return { input: { filter: { id: { in: ids } }, update: variables } };
    },
  },
  deleteOne: {
    dataMapper: (
      response: BaseRecord,
      params: DataProvider["deleteOne"]["arguments"],
    ) => {
      const pascalResource = camelcase(singular(params.resource), {
        pascalCase: true,
      });

      const key = `deleteOne${pascalResource}`;

      return response.data[key];
    },
    buildVariables: (params: DataProvider["deleteOne"]["arguments"]) => {
      return {
        input: { id: params.id },
      };
    },
  },
  deleteMany: {
    dataMapper: (response: BaseRecord, params: DeleteManyParams<any>) => {
      const pascalResource = camelcase(params.resource, {
        pascalCase: true,
      });

      const key = `deleteMany${pascalResource}`;

      return response.data[key];
    },
    buildVariables: (params: DeleteManyParams<any>) => {
      const { ids } = params;

      return {
        input: {
          filter: {
            id: { in: ids },
          },
        },
      };
    },
  },
};
