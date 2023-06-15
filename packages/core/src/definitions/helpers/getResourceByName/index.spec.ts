import { getResourceByName } from ".";

describe("getResourceByName", () => {
    describe.each(["legacy", "new"] as const)(
        `when routerType is %s`,
        (routerType) => {
            it("should return dummy resource if resource not found", () => {
                const result = getResourceByName(
                    "categories",
                    [{ name: "posts" }],
                    routerType,
                );

                expect(result).toEqual({
                    name: "categories",
                    identifier: "categories",
                });
            });

            it("should return resource if resource found with name", () => {
                const result = getResourceByName(
                    "categories",
                    [
                        { name: "posts", identifier: "foo" },
                        { name: "categories", identifier: "bar" },
                    ],
                    routerType,
                );

                expect(result).toEqual({
                    name: "categories",
                    identifier: "bar",
                });
            });

            it("should return resource if resource found with identifier", () => {
                const result = getResourceByName(
                    "foo",
                    [
                        { name: "posts", identifier: "foo" },
                        { name: "posts", identifier: "bar" },
                    ],
                    routerType,
                );

                expect(result).toEqual({
                    name: routerType === "new" ? "posts" : "foo",
                    identifier: "foo",
                });
            });
        },
    );
});
