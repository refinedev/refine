import type { MetaQuery, BaseKey } from "@refinedev/core";
import * as gql from "gql-query-builder";
import { getOperationFields } from "./graphql";

type GenerateUseManySubscriptionParams = {
  resource: string;
  meta: MetaQuery;
  ids?: BaseKey[];
};

type GenerateUseManySubscriptionReturnValues = {
  variables: any;
  query: string;
  operation: string;
};

export const generateUseManySubscription = ({
  resource,
  meta,
  ids,
}: GenerateUseManySubscriptionParams): GenerateUseManySubscriptionReturnValues => {
  if (!ids) {
    console.error(
      "[useSubscription]: `ids` is required in `params` for graphql subscriptions",
    );
  }

  const operation = meta.operation ?? resource;
  const gqlOperation = meta?.gqlQuery ?? meta?.gqlMutation;

  const hasuraFiltersType = `${operation}_bool_exp`;

  if (gqlOperation) {
    const query = `
            subscription ${operation}($where: ${hasuraFiltersType} ) {
                ${operation}(where: $where) {
                    ${getOperationFields(gqlOperation)}
                }
            }
        `;

    const variables = {
      where: {
        id: {
          _in: ids,
        },
      },
    };

    return { query, variables, operation };
  }

  const { query, variables } = gql.subscription({
    operation,
    fields: meta.fields,
    variables: meta.variables ?? {
      where: {
        type: hasuraFiltersType,
        value: {
          id: {
            _in: ids,
          },
        },
      },
    },
  });

  return { query, variables, operation };
};

/**
 * @deprecated Please use `generateUseManySubscription` instead.
 */
export const genereteUseManySubscription = generateUseManySubscription;
