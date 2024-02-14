import { FileInfo } from "jscodeshift";
import transform from "./react-router";
import { VITE_STARTER_SOURCE } from "./fixtures/vite-starter";

import jscodeshift from "jscodeshift";
import { WITH_COMPONENT_IMPORTS_SOURCE } from "./fixtures/react-router/with-component-imports";

describe("antd transformer", () => {
    const cases = [VITE_STARTER_SOURCE, WITH_COMPONENT_IMPORTS_SOURCE];

    it.each(cases)(
        "should transform the file \n----------------------------------------------------\n%s\n----------------------------------------------------",
        async (source) => {
            console.log(source);
            const fileInfo: FileInfo = {
                path: "App.tsx",
                source,
            };

            const result = await transform(fileInfo, {
                jscodeshift,
                j: jscodeshift,
                stats: () => {
                    // do nothing
                },
                report: () => {
                    // do nothing
                },
            });

            expect(result).toMatchSnapshot();
        },
    );
});
