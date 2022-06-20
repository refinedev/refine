import { createClient } from "../../src/index";
import "./index.mock";

const client = createClient({
    baseUrl: "http://awesome.localhost:3001",
    clientId: "client-id",
});

describe("DraftResource", () => {
    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(jest.fn());
    });
    describe("Create", () => {
        it("create successfull", async () => {
            const response: any = await client.draftResource.create({
                resources: [
                    {
                        name: "posts",
                        key: "posts",
                        hasList: true,
                        hasCreate: true,
                        hasEdit: true,
                        hasShow: true,
                        hasDelete: false,
                    },
                ],
            });

            expect(response.id).toBe("77db3164-f76d-4758-b77b-d7d37dc2021d");
            expect(response.user.name).toBe("Admin");
            expect(response.user.email).toBe("admin@refine.dev");
            expect(response.resources[0]).toEqual({
                key: "posts",
                name: "posts",
                hasList: true,
                hasCreate: true,
                hasEdit: true,
                hasShow: true,
                hasDelete: false,
            });
        });
    });

    describe("Get", () => {
        it("get successfull", async () => {
            const response: any = await client.draftResource.get();

            expect(response[0].id).toBe("77db3164-f76d-4758-b77b-d7d37dc2021d");
            expect(response[0].user.name).toBe("Admin");
            expect(response[0].user.email).toBe("admin@refine.dev");
            expect(response[0].resources[0]).toEqual({
                key: "posts",
                name: "posts",
                hasList: true,
                hasCreate: true,
                hasEdit: true,
                hasShow: true,
                hasDelete: false,
            });
        });
    });
});
