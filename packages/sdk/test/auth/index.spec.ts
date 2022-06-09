import { createClient } from "../../src/index";
import "./index.mock";

const client = createClient({
    baseUrl: "http://awesome.localhost:3001",
    clientId: "client-id",
});

describe("Auth", () => {
    describe("Login", () => {
        it("email & password login successfull", async () => {
            const response: any = await client.auth.login({
                email: "test@mail.com",
                password: "123123",
            });

            expect(response.user.email).toEqual("test@mail.com");
            expect(response.user.name).toEqual("test@mail.com");
            expect(response.accessToken).toBeTruthy();
            expect(response.refreshToken).toBeTruthy();
        });
    });

    describe("Register", () => {
        it("register successfull", async () => {
            const response: any = await client.auth.register({
                email: "john@mail.com",
                name: "John Doe",
                password: "123123",
            });

            expect(response.user.email).toEqual("john@mail.com");
            expect(response.user.name).toEqual("John Doe");
            expect(response.accessToken).toBeTruthy();
            expect(response.refreshToken).toBeTruthy();
        });
    });

    describe("Get Session By Token", () => {
        it("get user successfull", async () => {
            const response: any = await client.auth.getSessionByToken(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwMTBiNzU4LTUyMDctNDRmNy1iM2U0LTkzMjFlMDRlYjMxMiIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0QG1haWwuY29tIiwiYXBwbGljYXRpb25DbGllbnRJZCI6ImNsaWVudC1pZCIsImlhdCI6MTY1MTgyOTU4NSwiZXhwIjoxNjUxOTE1OTg1fQ.S7gi7Rl0xXglLrEu_Pff-Eik-M2TWfSkPVQMQqiOo24",
            );

            expect(response.email).toEqual("test@mail.com");
            expect(response.name).toEqual("test@mail.com");
        });
    });

    describe("Get Session", () => {
        it("get user successfull", async () => {
            const response: any = await client.auth.session();

            expect(response.email).toEqual("john@mail.com");
            expect(response.name).toEqual("John Doe");
        });
    });
});
