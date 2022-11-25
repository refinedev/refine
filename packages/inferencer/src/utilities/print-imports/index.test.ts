import { ImportElement } from "@/types";
import { printImports } from ".";

describe("printImports", () => {
    it("should return empty string if no imports are passed", () => {
        expect(printImports([])).toEqual([]);
    });

    it("should combine same module imports into one", () => {
        const imports: Array<ImportElement> = [
            ["useForm", "@pankod/refine-core"],
            ["useForm", "@pankod/refine-core"],
        ];

        expect(printImports(imports)).toEqual([
            'import { useForm } from "@pankod/refine-core";',
        ]);
    });

    it("should combine default and named imports", () => {
        const imports: Array<ImportElement> = [
            ["useEffect", "react"],
            ["React", "react", true],
        ];

        expect(printImports(imports)).toEqual([
            'import React, { useEffect } from "react";',
        ]);
    });

    it("should print two lines of imports", () => {
        const imports: Array<ImportElement> = [
            ["useEffect", "react"],
            ["useForm", "@pankod/refine-core"],
        ];

        expect(printImports(imports)).toEqual([
            'import { useEffect } from "react";',
            'import { useForm } from "@pankod/refine-core";',
        ]);
    });
});
