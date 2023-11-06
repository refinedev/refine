import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("deleteMany", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response with meta", async () => {
        const { data } = await dataProvider(nhost).deleteMany!({
            resource: "posts",
            ids: [
                "b16d671e-1172-4622-8c2f-b4b88fd60bfc",
                "56c313f2-8709-4e75-9d01-6d89583e4939",
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0].id).toEqual("56c313f2-8709-4e75-9d01-6d89583e4939");
        expect(data[0].title).toEqual(
            "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(data[1].id).toEqual("b16d671e-1172-4622-8c2f-b4b88fd60bfc");
        expect(data[1].title).toEqual("Etiam tincidunt ex ut auctor faucibus");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(nhost).deleteMany!({
            resource: "posts",
            ids: [
                "be7fd33d-efa2-4d49-8576-48d9a57a5bb1",
                "ed7b62d6-762f-42aa-a7f0-fe3670d75a67",
            ],
        });

        expect(data[0].id).toEqual("be7fd33d-efa2-4d49-8576-48d9a57a5bb1");
        expect(data[1].id).toEqual("ed7b62d6-762f-42aa-a7f0-fe3670d75a67");
    });
});
