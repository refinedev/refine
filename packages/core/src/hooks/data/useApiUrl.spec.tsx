import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useApiUrl } from "./";
import * as UseResource from "../../hooks/resource/useResource";

describe("useApiUrl Hook", () => {
    describe.each(["meta", "options"])(`should be called with %s`, (key) => {
        describe("when dataProvider is *not* provided", () => {
            describe("when resource is undefined", () => {
                it("returns default data provider", async () => {
                    const { result } = renderHook(() => useApiUrl(), {
                        wrapper: TestWrapper({
                            dataProvider: MockJSONServer,
                            resources: [
                                { name: "posts" },
                                {
                                    name: "categories",
                                    [key]: { dataProviderName: "categories" },
                                },
                            ],
                        }),
                    });

                    expect(result.current).toBe(
                        "https://api.fake-rest.refine.dev",
                    );
                });
            });

            describe('when current resource has "dataProviderName" meta', () => {
                it("returns resource's dataProvider", async () => {
                    jest.spyOn(UseResource, "useResource").mockReturnValue({
                        resource: {
                            name: "categories",
                            [key]: { dataProviderName: "categories" },
                        },
                        resources: [],
                    });

                    const { result } = renderHook(() => useApiUrl(), {
                        wrapper: TestWrapper({
                            dataProvider: MockJSONServer,
                            resources: [
                                { name: "posts" },
                                {
                                    name: "categories",
                                    [key]: { dataProviderName: "categories" },
                                },
                            ],
                        }),
                    });

                    expect(result.current).toBe(
                        "https://categories.api.fake-rest.refine.dev",
                    );
                });
            });

            describe('when current resource does *not* have "dataProviderName" meta', () => {
                it("returns default dataProvider", async () => {
                    jest.spyOn(UseResource, "useResource").mockReturnValue({
                        resource: {
                            name: "categories",
                        },
                        resources: [],
                    });

                    const { result } = renderHook(() => useApiUrl(), {
                        wrapper: TestWrapper({
                            dataProvider: MockJSONServer,
                            resources: [
                                { name: "posts" },
                                {
                                    name: "categories",
                                    [key]: { dataProviderName: "categories" },
                                },
                            ],
                        }),
                    });

                    expect(result.current).toBe(
                        "https://api.fake-rest.refine.dev",
                    );
                });
            });
        });

        describe("when dataProvider is provided", () => {
            it("returns provided data provider", async () => {
                jest.spyOn(UseResource, "useResource").mockReturnValue({
                    resource: {
                        name: "posts",
                    },
                    resources: [],
                });

                const { result } = renderHook(() => useApiUrl("categories"), {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                });

                expect(result.current).toBe(
                    "https://categories.api.fake-rest.refine.dev",
                );
            });
        });
    });
});
