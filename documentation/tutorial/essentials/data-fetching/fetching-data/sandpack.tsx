import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import clsx from "clsx";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    return (
        <TutorialSandpack
            showFiles={false}
            dependencies={{
                "@refinedev/core": "latest",
            }}
            files={{
                "App.tsx": {
                    code: AppTsxCode,
                },
                "data-provider.ts": {
                    code: DataProviderTsCode,
                },
            }}
        >
            {children}
        </TutorialSandpack>
    );
};

const AppTsxCode = /* tsx */ `
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

const DataProviderWithGetOneMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);
    const data = await response.json();

    return { data };
  },
  update: () => { throw new Error("Not implemented"); },
  getList: () => { throw new Error("Not implemented"); },
  create: () => { throw new Error("Not implemented"); },
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const BaseShowProductTsxCode = /* tsx */ `
export const ShowProduct = () => {
    return <h1>Hello world!</h1>;
};
`.trim();

const ShowProductWithUseOneTsxCode = /* tsx */ `
import { useOne } from "@refinedev/core";

export const ShowProduct = () => {
    const { data, isLoading } = useOne({ resource: "products", id: 123 });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Product name: {data?.data.name}</div>;
};
`.trim();

const AppTsxWithShowProductCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./data-provider";
import { ShowProduct } from "./show-product";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
        <ShowProduct />
    </Refine>
  );
}
`.trim();

export const AddGetOneMethod = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { sandpack } = useSandpack();

    return (
        <span
            onClick={() => {
                sandpack.updateFile(
                    "/data-provider.ts",
                    DataProviderWithGetOneMethodTsCode,
                );
                sandpack.setActiveFile("/data-provider.ts");
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

export const CreateShowProductFile = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { sandpack } = useSandpack();

    return (
        <button
            type="button"
            onClick={() => {
                sandpack.addFile({
                    "/show-product.tsx": {
                        code: BaseShowProductTsxCode,
                    },
                });
                sandpack.openFile("/show-product.tsx");
                sandpack.setActiveFile("/show-product.tsx");
            }}
            className={clsx(
                "mb-4",
                "rounded-md",
                "cursor-pointer",
                "appearance-none",
                "focus:outline-none",
                "py-2 px-3",
                "bg-refine-link-light bg:text-refine-link-dark",
                "hover:brightness-110",
                "[&>p]:!mb-0",
            )}
        >
            {children}
        </button>
    );
};

export const AddUseOneToShowProduct = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { sandpack } = useSandpack();

    return (
        <span
            onClick={() => {
                sandpack.updateFile(
                    "/show-product.tsx",
                    ShowProductWithUseOneTsxCode,
                );
                sandpack.setActiveFile("/show-product.tsx");
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

export const AddShowProductToAppTsx = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { sandpack } = useSandpack();

    return (
        <span
            onClick={() => {
                sandpack.updateFile("/App.tsx", AppTsxWithShowProductCode);
                sandpack.setActiveFile("/App.tsx");
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
