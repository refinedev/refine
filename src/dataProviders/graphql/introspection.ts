import { getIntrospectionQuery, IntrospectionQuery } from "graphql";
import { GraphQLClient } from "graphql-request";
import gql from "graphql-tag";

export default async (client: GraphQLClient) => {
    const introspectionRequest: Promise<IntrospectionQuery> = client.request(
        gql`
            ${getIntrospectionQuery()}
        `,
    );

    const schema = (await introspectionRequest).__schema;

    const queries = schema.types.reduce((acc: unknown[], type: any) => {
        if (
            type.name !== (schema.queryType && schema.queryType.name) &&
            type.name !== (schema.mutationType && schema.mutationType.name)
        ) {
            return acc;
        }

        return [...acc, ...type.fields];
    }, []);

    const types = schema.types.filter(
        (type) =>
            type.name !== (schema.queryType && schema.queryType.name) &&
            type.name !== (schema.mutationType && schema.mutationType.name),
    );

    return {
        queries,
        types,
    };
};
