import dataProvider from "../../src/index";
import { createClient, getApiUrl } from "../gqlClient";
import "./index.mock";

describe.each(["hasura-default", "graphql-default"] as const)(
    "custom with %s naming convention",
    (namingConvention) => {
        const apiUrl = getApiUrl(namingConvention);
        const operation =
            namingConvention === "hasura-default"
                ? "posts_aggregate"
                : "postsAggregate";

        it("correct get query response", async () => {
            const response = await dataProvider(
                createClient(namingConvention),
                {
                    namingConvention,
                },
            ).custom?.({
                url: apiUrl,
                method: "get",
                meta: {
                    operation,
                    fields: [
                        {
                            operation: "aggregate",
                            fields: ["count"],
                            variables: {},
                        },
                    ],
                    variables: {},
                },
            });

            expect(response?.data.aggregate.count).toBe(283);
        });
    },
);
