import { createClient } from "../../../src/index";
import "./index.mock";

const client = createClient({
    baseUrl: "http://awesome.localhost:3001",
    clientId: "client-id",
    clientSecret: "client-secret",
});

describe("Log Api", () => {
    describe("Create", () => {
        it("create successfull", async () => {
            const response: any = await client.log.api.create({
                resource: "post",
                action: "create",
                meta: {
                    id: "1",
                },
                data: {
                    title: "Test",
                },
                author: {
                    username: "admin",
                },
            });

            expect(response.meta.id).toEqual("1");
            expect(response.data.title).toEqual("Test");
            expect(response.resource).toEqual("post");
            expect(response.action).toEqual("create");
            expect(response.author.username).toEqual("admin");
        });
    });

    describe("Get", () => {
        it("get log by resource successfull", async () => {
            const response: any = await client.log.api.get({
                resource: "post",
            });

            expect(response[0].meta.id).toEqual("1");
            expect(response[0].data.title).toEqual("Test");
            expect(response[0].author.username).toEqual("admin");
        });
    });

    describe("Update", () => {
        it("get log by resource successfull", async () => {
            const response: any = await client.log.api.update(
                "9ade6617-fe68-4408-89b6-0b0db70be1d5",
                {
                    name: "updated name",
                },
            );

            expect(response.name).toEqual("updated name");
        });
    });
});
