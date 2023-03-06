import { getImports, getNameChangeInImport, reorderImports } from "./import";

describe("getImports", () => {
    it("should get all imports", () => {
        const content = `
                import React from "react";
                import { Button } from "antd";
                import { TextInput as AntTextInput } from "antd";
                import * as Antd from "antd";
                import { Button as AntButton, TextInput } from "antd";
                import { Button as AntButton, TextInput as AntTextInput } from "antd";
        `;

        const expected = [
            {
                statement: 'import React from "react";',
                importPath: "react",
                defaultImport: "React",
            },
            {
                statement: 'import { Button } from "antd";',
                importPath: "antd",
                namedImports: " { Button }",
            },
            {
                statement: 'import { TextInput as AntTextInput } from "antd";',
                importPath: "antd",
                namedImports: " { TextInput as AntTextInput }",
            },
            {
                statement: 'import * as Antd from "antd";',
                importPath: "antd",
                namespaceImport: "Antd",
            },
            {
                statement:
                    'import { Button as AntButton, TextInput } from "antd";',
                importPath: "antd",
                namedImports: " { Button as AntButton, TextInput }",
            },
            {
                statement:
                    'import { Button as AntButton, TextInput as AntTextInput } from "antd";',
                importPath: "antd",
                namedImports:
                    " { Button as AntButton, TextInput as AntTextInput }",
            },
        ];

        expect(getImports(content)).toEqual(expected);
    });
});

describe("getNameChangeInImport", () => {
    it("should get all name changes", () => {
        const statement = `
                { Button as AntButton, TextInput as AntTextInput }
        `;

        const expected = [
            {
                statement: " Button as AntButton,",
                fromName: "Button",
                toName: "AntButton",
                afterCharacter: ",",
            },
            {
                statement: " TextInput as AntTextInput ",
                fromName: "TextInput",
                toName: "AntTextInput",
                afterCharacter: undefined,
            },
        ];

        expect(getNameChangeInImport(statement)).toEqual(expected);
    });
});

describe("reorderImports", () => {
    it("should reorder named imports", () => {
        const content = `
import { Button, TextInput } from "zantd";
import { useEffect } from "react";
import { useList } from "@refinedev/core";
`;

        const expected = `
import { useEffect } from "react";
import { useList } from "@refinedev/core";
import { Button, TextInput } from "zantd";
`;

        expect(reorderImports(content).trim()).toEqual(expected.trim());
    });

    it("should merge the same module imports", () => {
        const content = `
import { Button, TextInput } from "antd";
import { useEffect } from "react";
import { useList, useOtherList, } from "@refinedev/core";
import { useOne, useOtherOne } from "@refinedev/core";
`;

        const expected = `
import { useEffect } from "react";
import { useList, useOtherList, useOne, useOtherOne } from "@refinedev/core";
import { Button, TextInput } from "antd";
`;

        expect(reorderImports(content).trim()).toEqual(expected.trim());
    });

    it("should merge default imports with named imports", () => {
        const content = `
import { Button, TextInput } from "antd";
import { useEffect } from "react";
import React from "react";
`;

        const expected = `
import React, { useEffect } from "react";
import { Button, TextInput } from "antd";
`;

        expect(reorderImports(content).trim()).toEqual(expected.trim());
    });

    it("should not merge namespace imports with named imports", () => {
        const content = `
import { Button, TextInput } from "antd";
import { useEffect } from "react";
import * as Antd from "antd";
`;

        const expected = `
import { useEffect } from "react";
import * as Antd from "antd";
import { Button, TextInput } from "antd";
`;

        expect(reorderImports(content).trim()).toEqual(expected.trim());
    });

    it("should not merge namespace imports with default imports", () => {
        const content = `
import React from "react";
import * as ReactPackage from "react";
`;

        const expected = `
import * as ReactPackage from "react";
import React from "react";
`;

        expect(reorderImports(content).trim()).toEqual(expected.trim());
    });

    it("should keep name changes in named imports", () => {
        const content = `
import { Button, TextInput } from "antd";
import { Layout as AntLayout } from "antd";
`;

        const expected = `
import { Button, TextInput, Layout as AntLayout } from "antd";
`;

        expect(reorderImports(content).trim()).toEqual(expected.trim());
    });

    it("should keep the imports with comments before", () => {
        const content = `
import React from "react";
// comment
import { Button, TextInput } from "antd";
import { Layout } from "antd";
`;

        const expected = `
import React from "react";
import { Layout } from "antd";

// comment
import { Button, TextInput } from "antd";
`;

        expect(reorderImports(content).trim()).toEqual(expected.trim());
    });

    it("should keep type imports and add them to the end", () => {
        const content = `
import type { Layout } from "antd";
import React from "react";
import { Button, TextInput } from "antd";
`;

        const expected = `
import React from "react";
import { Button, TextInput } from "antd";
import type { Layout } from "antd";
`;

        expect(reorderImports(content).trim()).toEqual(expected.trim());
    });
});
