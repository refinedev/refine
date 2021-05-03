import axios from "axios";

import { DataProvider } from "../../src/dataProvider";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("dataProvider", () => {
    const axiosInstance = axios.create();

    beforeAll(() => {
        axiosInstance.defaults.headers = {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5OTUzODU5LCJleHAiOjE2MjI1NDU4NTl9.hndbp-vtQ65VPafTE05E6Wbg0OKzNJnSKyBRjO9MHg4`,
        };
    });

    // create
    describe("create", () => {
        it("correct response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).create("posts", {
                title: "foo",
                content: "bar",
                cover: ["116"],
            });

            expect(data["title"]).toBe("foo");
            expect(data["content"]).toBe("bar");
            expect(data["cover"]["id"]).toBe(116);
        });
    });

    // deleteMany
    describe("deleteMany", () => {
        it("correct response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).deleteMany("posts", ["46"]);

            expect(data[0]["id"]).toBe(46);
            expect(data[0]["title"]).toBe("tiger");
            expect(data[0]["content"]).toBe("tiger");
        });
    });

    // deleteOne
    describe("deleteOne", () => {
        it("correct response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).deleteOne("posts", 47);

            expect(data["id"]).toBe(47);
            expect(data["title"]).toBe("test");
            expect(data["content"]).toBe("test");
        });
    });

    describe("getList", () => {
        it("correct response", async () => {
            const { data, total } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).getList("posts", {});

            expect(data[0]["id"]).toBe(49);
            expect(data[0]["title"]).toBe("0001");
            expect(total).toBe(5);
        });

        it("correct sorting response", async () => {
            const { data, total } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).getList("posts", {
                sort: {
                    field: "id",
                    order: "descend",
                },
            });

            expect(data[0]["id"]).toBe(53);
            expect(data[0]["title"]).toBe("foo");
            expect(total).toBe(5);
        });

        it("correct filter response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).getList("posts", {
                filters: {
                    title: ["foo"],
                },
            });

            expect(data[0]["title"]).toBe("foo");
            expect(data.length).toBe(3);
        });

        it("correct filter and sort response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).getList("posts", {
                filters: {
                    title: ["foo"],
                },
                sort: {
                    field: "id",
                    order: "descend",
                },
            });

            expect(data[0]["title"]).toBe("foo");
            expect(data.length).toBe(3);
        });
    });

    // getMany
    describe("getMany", () => {
        it("correct response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).getMany("posts", ["49"]);

            expect(data[0]["id"]).toBe(49);
            expect(data[0]["title"]).toBe("0001");
            expect(data[0]["content"]).toBe("0001");
        });
    });

    // getOne
    describe("getOne", () => {
        it("correct response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).getOne("posts", 49);

            expect(data["id"]).toBe(49);
            expect(data["title"]).toBe("0001");
            expect(data["content"]).toBe("0001");
        });
    });

    // updateOne
    describe("updateOne", () => {
        it("correct response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).update("posts", 49, {
                title: "updated",
            });

            expect(data["id"]).toBe(49);
            expect(data["title"]).toBe("updated");
        });
    });

    // updateMany
    describe("updateMany", () => {
        it("correct response", async () => {
            const { data } = await DataProvider(
                "https://refine-strapi.pankod.com",
                axiosInstance,
            ).updateMany("posts", [50, 51], {
                title: "updated",
            });

            expect(data[0]["id"]).toBe(50);
            expect(data[0]["title"]).toBe("updated");

            expect(data[1]["id"]).toBe(51);
            expect(data[1]["title"]).toBe("updated");
        });
    });
});
