import { DataProvider, BaseRecord } from "@refinedev/core";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import pluralize from "pluralize";
import camelCase from "camelcase";
import gqlTag from "graphql-tag";
import {
  generateFilter,
  generateSort,
  getOperationFields,
  isMutation,
} from "../utils";

const dataProvider = (client: GraphQLClient): Required<DataProvider> => {
  return {
    getList: async ({ resource, pagination, sorters, filters, meta }) => {
      const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

      const sortBy = generateSort(sorters);
      const filterBy = generateFilter(filters);

      const camelResource = camelCase(resource);

      const operation = meta?.operation ?? camelResource;

      if (meta?.gqlQuery) {
        const response = await client.request<BaseRecord>(meta.gqlQuery, {
          ...meta?.variables,
          sort: sortBy,
          where: filterBy,
          ...(mode === "server"
            ? {
                start: (current - 1) * pageSize,
                limit: pageSize,
              }
            : {}),
        });

        return {
          data: response[operation],
          total: response[operation].count,
        };
      }

      const { query, variables } = gql.query({
        operation,
        variables: {
          ...meta?.variables,
          sort: sortBy,
          where: { value: filterBy, type: "JSON" },
          ...(mode === "server"
            ? {
                start: (current - 1) * pageSize,
                limit: pageSize,
              }
            : {}),
        },
        fields: meta?.fields,
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation],
        total: response[operation].count,
      };
    },

    getMany: async ({ resource, ids, meta }) => {
      const camelResource = camelCase(resource);

      const operation = meta?.operation ?? camelResource;

      if (meta?.gqlQuery) {
        const response = await client.request<BaseRecord>(meta.gqlQuery, {
          where: {
            id_in: ids,
          },
        });
        return {
          data: response[operation],
        };
      }

      const { query, variables } = gql.query({
        operation,
        variables: {
          where: {
            value: { id_in: ids },
            type: "JSON",
          },
        },
        fields: meta?.fields,
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation],
      };
    },

    create: async ({ resource, variables, meta }) => {
      const singularResource = pluralize.singular(resource);
      const camelCreateName = camelCase(`create-${singularResource}`);

      const inputType = meta?.inputType ?? `${camelCreateName}Input`;

      const operation = meta?.operation ?? camelCreateName;
      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response = await client.request<BaseRecord>(gqlOperation, {
          input: {
            data: variables || {},
          },
        });

        return {
          data: response[operation][singularResource],
        };
      }

      const { query, variables: gqlVariables } = gql.mutation({
        operation,
        variables: {
          input: {
            value: { data: variables },
            type: inputType,
          },
        },
        fields: meta?.fields ?? [
          {
            operation: singularResource,
            fields: ["id"],
            variables: {},
          },
        ],
      });
      const response = await client.request<BaseRecord>(query, gqlVariables);

      return {
        data: response[operation][singularResource],
      };
    },

    createMany: async ({ resource, variables, meta }) => {
      const singularResource = pluralize.singular(resource);
      const camelCreateName = camelCase(`create-${singularResource}`);

      const inputType = meta?.operation ?? `${camelCreateName}Input`;

      const operation = meta?.operation ?? camelCreateName;
      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response = await Promise.all(
          variables.map(async (param) => {
            const result = await client.request<BaseRecord>(gqlOperation, {
              input: {
                data: param || {},
              },
            });

            return result[operation][singularResource];
          }),
        );

        return {
          data: response,
        };
      }

      const response = await Promise.all(
        variables.map(async (param) => {
          const { query, variables: gqlVariables } = gql.mutation({
            operation,
            variables: {
              input: {
                value: { data: param },
                type: inputType,
              },
            },
            fields: meta?.fields ?? [
              {
                operation: singularResource,
                fields: ["id"],
                variables: {},
              },
            ],
          });
          const result = await client.request<BaseRecord>(query, gqlVariables);

          return result[operation][singularResource];
        }),
      );
      return {
        data: response,
      };
    },

    update: async ({ resource, id, variables, meta }) => {
      const singularResource = pluralize.singular(resource);
      const camelUpdateName = camelCase(`update-${singularResource}`);

      const inputType = meta?.operation ?? `${camelUpdateName}Input`;

      const operation = meta?.operation ?? camelUpdateName;
      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response = await client.request<BaseRecord>(gqlOperation, {
          id,
          data: {
            ...variables,
          },
        });

        return {
          data: response[operation][singularResource],
        };
      }

      const { query, variables: gqlVariables } = gql.mutation({
        operation,
        variables: {
          input: {
            value: { where: { id }, data: variables },
            type: inputType,
          },
        },
        fields: meta?.fields ?? [
          {
            operation: singularResource,
            fields: ["id"],
            variables: {},
          },
        ],
      });
      const response = await client.request<BaseRecord>(query, gqlVariables);

      return {
        data: response[operation][singularResource],
      };
    },

    updateMany: async ({ resource, ids, variables, meta }) => {
      const singularResource = pluralize.singular(resource);
      const camelUpdateName = camelCase(`update-${singularResource}`);

      const operation = meta?.operation ?? camelUpdateName;
      const inputType = meta?.operation ?? `${camelUpdateName}Input`;

      if (meta?.gqlMutation) {
        const response = await Promise.all(
          ids.map(async (id) => {
            if (!meta?.gqlMutation) return null;

            const result = await client.request<BaseRecord>(meta.gqlMutation, {
              input: {
                value: { where: { id }, data: variables },
                type: inputType,
              },
            });

            return result[operation][singularResource];
          }),
        );

        return {
          data: response,
        };
      }

      const response = await Promise.all(
        ids.map(async (id) => {
          const { query, variables: gqlVariables } = gql.mutation({
            operation,
            variables: {
              input: {
                value: { where: { id }, data: variables },
                type: inputType,
              },
            },
            fields: meta?.fields ?? [
              {
                operation: singularResource,
                fields: ["id"],
                variables: {},
              },
            ],
          });
          const result = await client.request<BaseRecord>(query, gqlVariables);

          return result[operation][singularResource];
        }),
      );
      return {
        data: response,
      };
    },

    getOne: async ({ resource, id, meta }) => {
      const singularResource = pluralize.singular(resource);
      const camelResource = camelCase(singularResource);

      const operation = meta?.operation ?? camelResource;
      const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;
      const pascalOperation = camelCase(operation, {
        pascalCase: true,
      });

      if (gqlOperation) {
        let query = gqlOperation;

        if (isMutation(gqlOperation)) {
          const stringFields = getOperationFields(gqlOperation);

          query = gqlTag`
                        query Get${pascalOperation}($id: $uuid!) {
                            ${operation}(id: $id) {
                            ${stringFields}
                            }
                        }
                    `;
        }

        const response = await client.request<BaseRecord>(query, {
          id,
        });

        return {
          data: response[operation],
        };
      }

      const { query, variables } = gql.query({
        operation,
        variables: {
          id: { value: id, type: "ID", required: true },
        },
        fields: meta?.fields,
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation],
      };
    },

    deleteOne: async ({ resource, id, meta }) => {
      const singularResource = pluralize.singular(resource);
      const camelDeleteName = camelCase(`delete-${singularResource}`);

      const operation = meta?.operation ?? camelDeleteName;
      const inputType = meta?.operation ?? `${camelDeleteName}Input`;

      if (meta?.gqlMutation) {
        const response = await client.request<BaseRecord>(meta.gqlMutation, {
          input: {
            where: { id },
          },
        });

        return {
          data: response[operation][singularResource],
        };
      }

      const { query, variables } = gql.mutation({
        operation,
        variables: {
          input: {
            value: { where: { id } },
            type: inputType,
          },
        },
        fields: meta?.fields ?? [
          {
            operation: singularResource,
            fields: ["id"],
            variables: {},
          },
        ],
      });

      const response = await client.request<BaseRecord>(query, variables);

      return {
        data: response[operation][singularResource],
      };
    },

    deleteMany: async ({ resource, ids, meta }) => {
      const singularResource = pluralize.singular(resource);
      const camelDeleteName = camelCase(`delete-${singularResource}`);

      const operation = meta?.operation ?? camelDeleteName;
      const inputType = meta?.operation ?? `${camelDeleteName}Input`;

      if (meta?.gqlMutation) {
        const response = await Promise.all(
          ids.map(async (id) => {
            if (!meta?.gqlMutation) return null;

            const result = await client.request<BaseRecord>(meta.gqlMutation, {
              input: {
                where: { id },
              },
            });

            return result[operation][singularResource];
          }),
        );

        return {
          data: response,
        };
      }

      const response = await Promise.all(
        ids.map(async (id) => {
          const { query, variables: gqlVariables } = gql.mutation({
            operation,
            variables: {
              input: {
                value: { where: { id } },
                type: inputType,
              },
            },
            fields: meta?.fields ?? [
              {
                operation: singularResource,
                fields: ["id"],
                variables: {},
              },
            ],
          });
          const result = await client.request<BaseRecord>(query, gqlVariables);

          return result[operation][singularResource];
        }),
      );
      return {
        data: response,
      };
    },

    getApiUrl: () => {
      throw Error("Not implemented on refine-graphql data provider.");
    },

    custom: async ({ url, method, headers, meta }) => {
      let gqlClient = client;

      if (url) {
        gqlClient = new GraphQLClient(url, { headers });
      }

      const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

      if (gqlOperation) {
        const response: any = await client.request(
          gqlOperation,
          meta?.variables ?? {},
        );

        return { data: response };
      }

      if (meta) {
        if (meta.operation) {
          if (method === "get") {
            const { query, variables } = gql.query({
              operation: meta.operation,
              fields: meta.fields,
              variables: meta.variables,
            });

            const response = await gqlClient.request<BaseRecord>(
              query,
              variables,
            );

            return {
              data: response[meta.operation],
            };
          }
          const { query, variables } = gql.mutation({
            operation: meta.operation,
            fields: meta.fields,
            variables: meta.variables,
          });

          const response = await gqlClient.request<BaseRecord>(
            query,
            variables,
          );

          return {
            data: response[meta.operation],
          };
        }
        throw Error("GraphQL operation name required.");
      }
      throw Error(
        "GraphQL need to operation, fields and variables values in meta object.",
      );
    },
  };
};

export default dataProvider;
