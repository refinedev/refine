// import { DataProvider } from '@pankod/refine';
import { GraphQLClient } from 'graphql-request';
import * as gql from 'gql-query-builder';
import camelCase from 'camelcase';

const dataProvider = (client: GraphQLClient): any => {
    return {
        getList: async ({ resource, pagination, metaData }: any) => {
            const current = pagination?.current ?? 1;
            const limit = pagination?.pageSize || 10;
            const offset = (current - 1) * limit;

            console.log(current, offset);

            const camelResource = camelCase(resource);

            const operation = metaData?.operation ?? camelResource;

            const { query, variables } = gql.query([
                {
                    operation,
                    fields: metaData?.fields,
                    variables: {
                        limit,
                        offset,
                    },
                },
                {
                    operation: `${operation}_aggregate`,
                    fields: [{ aggregate: ['count'] }],
                },
            ]);

            console.log(query);

            const result = await client.request(query, variables);

            console.log(result);

            return {
                data: result[operation],
                total: result[`${operation}_aggregate`].aggregate.count,
            };
        },
    };
};

export default dataProvider;
