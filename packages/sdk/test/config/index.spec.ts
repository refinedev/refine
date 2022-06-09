import { createClient } from "../../src/index";
import "./index.mock";

const client = createClient({
    baseUrl: "http://awesome.localhost:3001",
    clientId: "client-id",
});

describe("Config", () => {
    describe("Get", () => {
        it("get config successfull", async () => {
            const response: any = await client.config.get();

            expect(response[0]["name"]).toEqual("post");
            expect(response[0]["options"]["auditLog"]["permissions"]).toEqual([
                "list",
            ]);
        });
    });
});
