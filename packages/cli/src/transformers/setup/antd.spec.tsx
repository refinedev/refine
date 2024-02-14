import { FileInfo } from "jscodeshift";
import transform from "./antd";
import { VITE_STARTER_SOURCE } from "./fixtures/vite-starter";

import jscodeshift from "jscodeshift";
import { BASE_HEADLESS_SOURCE } from "./fixtures/antd/base-headless";
import { WITH_EXISTING_ANTD_SETUP_SOURCE } from "./fixtures/antd/with-existing-antd-setup";

describe("antd transformer", () => {
    const cases = [
        VITE_STARTER_SOURCE,
        BASE_HEADLESS_SOURCE,
        WITH_EXISTING_ANTD_SETUP_SOURCE,
    ];

    it.each(cases)(
        "should transform the file\n----------------------------------------------------\n%s\n----------------------------------------------------",
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

            expect(result?.trim()).toMatchSnapshot();
        },
    );
});
