import { generateUseOneSubscription } from "../../src/utils";

describe("generateUseOneSubscription", () => {
    const resource = "exampleResources";
    const meta = {
        operation: "exampleOperation",
        fields: ["id", "name"],
    };
    const id = 1;

    it("should generate a subscription with the provided parameters", () => {
        const { query, variables, operation } = generateUseOneSubscription({
            resource,
            meta,
            id,
        });

        expect(operation).toEqual(meta.operation);
        expect(query).toContain(meta.operation);
        expect(query).toMatch(/id/);
        expect(query).toMatch(/name/);
        expect(variables).toEqual({
            id: 1,
        });
    });

    it("should log an error when id is not provided", () => {
        console.error = jest.fn();

        generateUseOneSubscription({
            resource,
            meta,
        });

        expect(console.error).toHaveBeenCalledWith(
            "[useSubscription]: `id` is required in `params` for graphql subscriptions",
        );
    });

    it("should generate a subscription with resource when meta.operation is undefined", () => {
        const { query, operation } = generateUseOneSubscription({
            resource: "example-resource",
            meta: { ...meta, operation: undefined },
        });

        expect(operation).toEqual("exampleResource");
        expect(query).toContain("exampleResource");
    });
});
