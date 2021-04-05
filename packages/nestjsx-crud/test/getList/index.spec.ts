import axios from "axios";
// import nock from "nock";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getList", () => {
    xit("correct response", async () => {
        const response = await JsonServer(
            "https://readmin-fake-rest.pankod.com",
        ).getList("posts", {});

        expect(response.data[0]["id"]).toBe(1000);
        expect(response.data[0]["title"]).toBe(
            "Ducimus amet beatae optio blanditiis dolore fugit aut quam.g",
        );
        expect(response.total).toBe(1000);
    });

    xit("correct sorting response", async () => {
        const response = await JsonServer(
            "https://readmin-fake-rest.pankod.com",
        ).getList("posts", {
            sort: {
                field: "id",
                order: "ascend",
            },
        });

        expect(response.data[0]["id"]).toBe(1);
        expect(response.data[0]["title"]).toBe(
            "Deleniti et quasi architecto hic quam et tempora vero quo.",
        );
        expect(response.total).toBe(1000);
    });

    xit("correct filter response", async () => {
        const response = await JsonServer(
            "https://readmin-fake-rest.pankod.com",
        ).getList("posts", {
            filters: {
                categoryId: [1],
            },
        });

        expect(response.data[0]["categoryId"]).toBe(1);
        expect(response.total).toBe(20);
    });

    xit("correct filter and sort response", async () => {
        const response = await JsonServer(
            "https://readmin-fake-rest.pankod.com",
        ).getList("posts", {
            filters: {
                categoryId: [1],
            },
            sort: {
                field: "id",
                order: "ascend",
            },
        });

        expect(response.data[0]["id"]).toBe(61);
        expect(response.total).toBe(20);
    });
});
