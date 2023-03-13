import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("createMany", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response with meta", async () => {
        const { data } = await dataProvider(nhost).createMany!({
            resource: "posts",
            variables: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
                },
            ],
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data[0]["title"]).toEqual(
            "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(data[0]["content"]).toEqual("Vestibulum vulputate sapien arcu.");
        expect(data[0]["category"].id).toEqual(
            "73c14cb4-a58c-471d-9410-fc97ea6dac66",
        );

        expect(data[1]["title"]).toEqual(
            "Etiam tincidunt ex ut auctor faucibus",
        );
        expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
        expect(data[1]["category"].id).toEqual(
            "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
        );
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(nhost).createMany!({
            resource: "posts",
            variables: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
                },
            ],
        });

        expect(data[0]["id"]).toEqual("2d0c792c-4d28-4dff-a5b8-37858d0faa54");
        expect(data[1]["id"]).toEqual("92bbb942-a5a7-4cd9-8232-d7aa544a0c40");
    });
});
