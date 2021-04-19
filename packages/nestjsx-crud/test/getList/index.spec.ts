import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getList", () => {
    it("correct response", async () => {
        const { data, total } = await JsonServer(
            "https://readmin-nestjs-crud.pankod.com",
            axios,
        ).getList("posts", {});

        expect(data[0]["id"]).toBe("fdbc6bbe-58a9-469c-a10b-6f089cd77fd7");
        expect(data[0]["title"]).toBe("Bike relationships repurpose");
        expect(total).toBe(136);
    });

    it("correct sorting response", async () => {
        const { data, total } = await JsonServer(
            "https://readmin-nestjs-crud.pankod.com",
            axios,
        ).getList("posts", {
            sort: {
                field: "id",
                order: "ascend",
            },
        });

        expect(data[0]["id"]).toBe("0215838f-cf6d-49ed-8ee2-1a1350d126e5");
        expect(data[0]["title"]).toBe("Reboot e-commerce customer loyalty");
        expect(total).toBe(136);
    });

    it("correct filter response", async () => {
        const { data, total } = await JsonServer(
            "https://readmin-nestjs-crud.pankod.com",
            axios,
        ).getList("posts", {
            filters: {
                "category.id": ["ba18b409-7084-4f5f-926c-207eab172f73"],
            },
        });

        expect(data[0]["category"]["title"]).toBe(
            "Redundant Aruban Guilder Consultant",
        );
        expect(total).toBe(3);
    });

    it("correct filter and sort response", async () => {
        const { data, total } = await JsonServer(
            "https://readmin-nestjs-crud.pankod.com",
            axios,
        ).getList("posts", {
            filters: {
                "category.id": ["ba18b409-7084-4f5f-926c-207eab172f73"],
            },
            sort: {
                field: "id",
                order: "ascend",
            },
        });

        expect(data[0]["title"]).toBe("Borders Shirt withdrawal");
        expect(total).toBe(3);
    });
});
