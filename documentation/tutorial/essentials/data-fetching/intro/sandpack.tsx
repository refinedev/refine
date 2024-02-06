import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import clsx from "clsx";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { dependencies, files as initialFiles } from "../../intro/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    return (
        <TutorialSandpack
            dependencies={dependencies}
            files={files}
            finalFiles={finalFiles}
        >
            {children}
        </TutorialSandpack>
    );
};

const UpdatedAppTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./data-provider";

export default function App(): JSX.Element {
  return <Refine dataProvider={dataProvider}></Refine>;
}
`.trim();

const DataProviderTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
    getOne: () => { throw new Error("Not implemented"); },
    update: () => { throw new Error("Not implemented"); },
    getList: () => { throw new Error("Not implemented"); },
    create: () => { throw new Error("Not implemented"); },
    deleteOne: () => { throw new Error("Not implemented"); },
    getApiUrl: () => API_URL,
    // Optional methods:
    // getMany: () => { /* ... */ },
    // createMany: () => { /* ... */ },
    // deleteMany: () => { /* ... */ },
    // updateMany: () => { /* ... */ },
    // custom: () => { /* ... */ },
}
`.trim();

export const FocusOnDataProviderFile = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { sandpack } = useSandpack();

    return (
        <span
            onClick={() => {
                sandpack.openFile("/data-provider.ts");
            }}
            className={clsx(
                "cursor-pointer",
                "text-refine-link-light dark:text-refine-link-dark",
                "[&>code]:!text-refine-link-light dark:[&>code]:!text-refine-link-dark",
                "hover:underline",
            )}
        >
            {children}
        </span>
    );
};

export const AddDataProviderToRefine = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("App.tsx", UpdatedAppTsxCode);
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

export const files = {
    ...initialFiles,
    "data-provider.ts": {
        code: DataProviderTsCode,
    },
};

export const finalFiles = {
    ...removeActiveFromFiles(files),
    "App.tsx": {
        code: UpdatedAppTsxCode,
        active: true,
    },
    "data-provider.ts": {
        code: DataProviderTsCode,
    },
};
