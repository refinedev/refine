import axios from "axios";
// import nock from "nock";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("custom", () => {
    const API_URL = "https://api.nestjsx-crud.refine.dev";

    it("correct get response", async () => {
        const response = await JsonServer(API_URL, axios).custom(
            `${API_URL}/users`,
            "get",
        );

        expect(response.data[0]["id"]).toBe(
            "f5372c43-58b8-49ba-8c5b-7d8c48ecc233",
        );
        expect(response.data[0]["email"]).toBe("meghan.Sipes@hotmail.com");
    });

    it("correct filter response", async () => {
        const response = await JsonServer(API_URL, axios).custom(
            `${API_URL}/users`,
            "get",
            {
                filters: [
                    {
                        field: "email",
                        operator: "eq",
                        value: "meghan.Sipes@hotmail.com",
                    },
                ],
            },
        );

        expect(response.data[0]["id"]).toBe(
            "f5372c43-58b8-49ba-8c5b-7d8c48ecc233",
        );
        expect(response.data[0]["email"]).toBe("meghan.Sipes@hotmail.com");
    });

    it("correct sort response", async () => {
        const response = await JsonServer(API_URL, axios).custom(
            `${API_URL}/users`,
            "get",
            {
                sort: [
                    {
                        field: "id",
                        order: "asc",
                    },
                ],
            },
        );

        expect(response.data[0]["id"]).toBe(
            "009c075f-5bec-4ec5-8b0f-e88613352419",
        );

        expect(response.data[0]["email"]).toBe("maximilian_Hand21@hotmail.com");
    });

    it("correct post request", async () => {
        const response = await JsonServer(API_URL, axios).custom(
            `${API_URL}/users`,
            "post",
            {
                payload: {
                    firstName: "test",
                    lastName: "test",
                    email: "test@mail.com",
                    status: true,
                },
            },
        );

        expect(response.data).toEqual({
            id: "b7175fc8-3ab8-4e49-9034-8b63763e7b67",
            firstName: "test",
            lastName: "test",
            email: "test@mail.com",
            status: true,
            createdAt: "2021-05-21T12:39:35.258Z",
            updatedAt: "2021-05-21T12:39:35.258Z",
        });
    });
});
