import type { DocumentNode } from "graphql";

export type GraphQLQueryOptions = {
  /**
   * @description GraphQL query to be used by data providers.
   * @optional
   * @example
   * ```tsx
   * import gql from 'graphql-tag'
   * import { useOne } from '@refinedev/core'
   *
   * const PRODUCT_QUERY = gql`
   *   query GetProduct($id: ID!) {
   *     product(id: $id) {
   *       id
   *       name
   *     }
   *   }
   * `
   *
   * useOne({
   *   id: 1,
   *   meta: { gqlQuery: PRODUCT_QUERY }
   * })
   * ```
   */
  gqlQuery?: DocumentNode;
  /**
   * @description GraphQL mutation to be used by data providers.
   * @optional
   * @example
   * ```tsx
   * import gql from 'graphql-tag'
   * import { useCreate } from '@refinedev/core'
   *
   * const PRODUCT_CREATE_MUTATION = gql`
   *   mutation CreateProduct($input: CreateOneProductInput!) {
   *     createProduct(input: $input) {
   *       id
   *       name
   *     }
   *   }
   * `
   * const { mutate } = useCreate()
   *
   * mutate({
   *   values: { name: "My Product" },
   *   meta: { gqlQuery: PRODUCT_QUERY }
   * })
   * ```
   */
  gqlMutation?: DocumentNode;
};
