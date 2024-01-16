import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

const dependencies = {
    "@refinedev/core": "latest",
    "@refinedev/simple-rest": "latest",
};

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    return (
        <TutorialSandpack
            previewOnly
            dependencies={dependencies}
            files={{
                "App.tsx": {
                    code: AppTsxCode,
                },
            }}
        >
            {children}
        </TutorialSandpack>
    );
};

const AppTsxCode = /* jsx */ `
import React from "react";
import { Refine, WelcomePage } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

export default function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        >
            <WelcomePage />
        </Refine>
    )
}
`.trim();
