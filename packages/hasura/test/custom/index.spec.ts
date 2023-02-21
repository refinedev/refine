import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("custom", () => {
    it("correct get query response", async () => {
        const response = await dataProvider(client).custom?.({
            url: "https://flowing-mammal-24.hasura.app/v1/graphql",
            method: "get",
            meta: {
                operation: "posts_aggregate",
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

        expect(response?.data.aggregate.count).toBe(34);
    });
});
