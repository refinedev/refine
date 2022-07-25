import { dataProvider } from "../../src/index";
import client from "../appwriteClient";
import "./index.mock";

xdescribe("create", () => {
    fit("correct response with metaData", async () => {
        const { data } = await dataProvider(client).create({
            resource: "6180e6efb14df",
            variables: {
                title: "Lorem ipsum dolor",
            },
            metaData: {
                readPermissions: ["role:all"],
                writePermissions: ["role:all"],
            },
        });

        console.log(data);

        expect(data.title).toEqual("Lorem ipsum dolor");
        expect(data.id).toBeTruthy();
    });
});
