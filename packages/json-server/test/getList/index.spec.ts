import axios from "axios";
// import nock from "nock";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getList", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://refine-fake-rest.pankod.com",
            axios,
        ).getList("posts", {});

        expect(response.data[0]["id"]).toBe(1000);
        expect(response.data[0]["title"]).toBe(
            "Et ratione rerum eos optio id nihil.",
        );
        expect(response.total).toBe(1000);
    });

    it("correct sorting response", async () => {
        const response = await JsonServer(
            "https://refine-fake-rest.pankod.com",
            axios,
        ).getList("posts", {
            sort: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe(1);
        expect(response.data[0]["title"]).toBe("Unde illum cupiditate ut.");
        expect(response.total).toBe(1000);
    });

    it("correct filter response", async () => {
        const response = await JsonServer(
            "https://refine-fake-rest.pankod.com",
            axios,
        ).getList("posts", {
            filters: [
                {
                    field: "category.id",
                    operator: "eq",
                    value: ["1"],
                },
            ],
        });

        expect(response.data[0]["category"]["id"]).toBe(1);
        expect(response.total).toBe(18);
    });

    it("correct filter and sort response", async () => {
        const response = await JsonServer(
            "https://refine-fake-rest.pankod.com",
            axios,
        ).getList("posts", {
            filters: [
                {
                    field: "category.id",
                    operator: "eq",
                    value: ["1"],
                },
            ],
            sort: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe(67);
        expect(response.total).toBe(18);
    });
});
