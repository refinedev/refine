import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("createMany", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).createMany!({
            resource: "posts",
            variables: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    status: "draft",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    status: "draft",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
            metaData: {
                fields: [
                    "id",
                    "title",
                    "content",
                    "status",
                    { category: ["id"] },
                ],
            },
        });

        expect(data[0]["title"]).toEqual(
            "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(data[0]["content"]).toEqual("Vestibulum vulputate sapien arcu.");
        expect(data[0]["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
        expect(data[0]["status"]).toEqual("draft");

        expect(data[1]["title"]).toEqual(
            "Etiam tincidunt ex ut auctor faucibus",
        );
        expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
        expect(data[1]["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
        expect(data[1]["status"]).toEqual("draft");
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(client).createMany!({
            resource: "posts",
            variables: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    status: "draft",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    status: "draft",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        });

        expect(data[0]["id"]).toEqual("8428ad6a-2492-4cc2-84dd-09ed01cf6858");
        expect(data[1]["id"]).toEqual("83c30a85-5eb6-4441-be06-deb6b398285d");
    });
});
