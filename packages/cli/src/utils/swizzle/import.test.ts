import { getImports, getNameChangeInImport } from "./import";

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
