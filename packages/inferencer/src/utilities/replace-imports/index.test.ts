import { replaceImports } from ".";

describe("replaceImports", () => {
    const packages = {
        "@pankod/refine-core": "RefineCore",
        "@pankod/refine-antd": "RefineAntd",
    };

    it("should return empty string if no string is passed", () => {
        expect(replaceImports("", packages).trim()).toBe("");
    });

    it("should replace imports", () => {
        const code = `
import { useForm } from "@pankod/refine-core";
import { useTable } from "@pankod/refine-antd";
`;

        expect(replaceImports(code, packages)).toContain(
            "const { useForm } = RefineCore;",
        );
        expect(replaceImports(code, packages)).toContain(
            "const { useTable } = RefineAntd;",
        );
    });
});
