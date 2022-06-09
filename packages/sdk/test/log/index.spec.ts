import { createClient } from "../../src/index";
import "./index.mock";

const client = createClient({
    baseUrl: "http://awesome.localhost:3001",
    clientId: "client-id",
});

describe("Log", () => {
    describe("Create", () => {
        it("create successfull", async () => {
            const response: any = await client.log.create({
                resource: "post",
                action: "create",
                meta: {
                    id: "1",
                },
                data: {
                    title: "Test",
                },
            });

            expect(response.meta.id).toEqual("1");
            expect(response.data.title).toEqual("Test");
            expect(response.resource).toEqual("post");
            expect(response.action).toEqual("create");
            expect(response.author.email).toEqual("test@mail.com");
        });
    });

    describe("Get", () => {
        it("get log by resource successfull", async () => {
            const response: any = await client.log.get({
                resource: "post",
            });

            expect(response[0].meta.id).toEqual("1");
            expect(response[0].data.title).toEqual("Test");
            expect(response[0].author.email).toEqual("test@mail.com");
        });
    });

    describe("Update", () => {
        it("get log by resource successfull", async () => {
            const response: any = await client.log.update(
                "507a172c-49d8-4620-a983-5c161e20862b",
                {
                    name: "updated name",
                },
            );

            expect(response.name).toEqual("updated name");
        });
    });
});
