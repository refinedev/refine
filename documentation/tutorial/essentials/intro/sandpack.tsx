import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    return (
        <TutorialSandpack previewOnly dependencies={dependencies} files={files}>
            {children}
        </TutorialSandpack>
    );
};

const AppTsxCode = /* jsx */ `
import React from "react";
import { Refine, WelcomePage } from "@refinedev/core";

export default function App() {
    return (
        <Refine>
            <WelcomePage />
        </Refine>
    )
}
`.trim();

export const files = {
    "App.tsx": {
        code: AppTsxCode,
    },
};

export const dependencies = {
    "@refinedev/core": "latest",
};
