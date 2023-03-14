import { createClient } from "../../src/index";
import "./index.mock";

const client = createClient({
    baseUrl: "http://awesome.localhost:3001",
    clientId: "client-id",
});

describe("Config", () => {
    describe("Auth", () => {
        it("get config successfull", async () => {
            const response: any = await client.config.auth();

            expect(response[0]["disableSignup"]).toEqual(false);
            expect(response[0]["name"]).toEqual("database");
            expect(response[0]["type"]).toEqual("database");
        });
    });

    describe("Resources", () => {
        it("get config successfull", async () => {
            const response: any = await client.config.resources("dev");

            expect(response[0]["name"]).toEqual("post");
            expect(response[0]["meta"]["auditLog"]["permissions"]).toEqual([
                "list",
            ]);
        });
    });
});
