import { dataProvider } from "../../src/index";
import client from "../appwriteClient";
import "./index.mock";

xdescribe("createMany", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client).createMany({
            resource: "6180e6efb14df",
            variables: [
                {
                    title: "Test 1",
                },
                {
                    title: "Test 2",
                },
            ],
        });

        expect(data[0].title).toEqual("Test 1");
        expect(data[0].id).toBeTruthy();
        expect(data[1].title).toEqual("Test 2");
        expect(data[1].id).toBeTruthy();
    });
});
