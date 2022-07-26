import axios from "axios";

import DataProvider from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");
axios.defaults.headers.common.Cookie =
    "connect.sid=s%3AcgwfOVV47QrjFqPfyMxN6TqFOVKTLZPj.ApeBjENOF58To3guqq3qFmfUHrK%2Bll5pRnXNWF7D3V8;";

describe("create", () => {
    it("correct response", async () => {
        const response = await DataProvider(
            "https://refine-example-storefront.herokuapp.com/store",
            axios,
        ).create({
            resource: "customers",
            variables: {
                email: "melih@pankod.dev",
                first_name: "John",
                last_name: "Doe",
                password: "melih9696",
            },
        });

        const { data } = response;

        expect(data["customer"]["first_name"]).toBe("John");
        expect(data["customer"]["last_name"]).toBe("Doe");
        expect(data["customer"]["email"]).toBe("melih@pankod.dev");

        // expect(data["id"]).toBe(1001);
        // expect(data["title"]).toBe("foo");
    });
});
