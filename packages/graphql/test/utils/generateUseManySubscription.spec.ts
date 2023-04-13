import { generateUseManySubscription } from "../../src/utils";

describe("generateUseManySubscription", () => {
    const resource = "exampleResource";
    const meta = {
        operation: "exampleOperation",
        fields: ["id", "name"],
    };
    const ids = [1, 2, 3];

    it("should generate a subscription with the provided parameters", () => {
        const { query, variables, operation } = generateUseManySubscription({
            resource,
            meta,
            ids,
        });

        expect(operation).toEqual(meta.operation);
        expect(query).toContain(meta.operation);
        expect(query).toMatch(/id/);
        expect(query).toMatch(/name/);

        expect(variables).toEqual({
            where: { id_in: [1, 2, 3] },
        });
    });

    it("should log an error when ids is not provided", () => {
        console.error = jest.fn();

        generateUseManySubscription({
            resource,
            meta,
        });

        expect(console.error).toHaveBeenCalledWith(
            "[useSubscription]: `ids` is required in `params` for graphql subscriptions",
        );
    });

    it("should generate a subscription with resource when meta.operation is undefined", () => {
        const { query, operation } = generateUseManySubscription({
            resource: "example-resource",
            meta: { ...meta, operation: undefined },
        });

        expect(operation).toEqual("exampleResource");
        expect(query).toContain("exampleResource");
    });
});
