/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";

export const packageMap = {
    "@pankod/refine-core": "RefineCore",
    "@pankod/refine-react-router-v6": "RefineReactRouterV6",
    "@pankod/refine-antd": "RefineAntd",
    "@pankod/refine-mui": "RefineMui",
    "@pankod/refine-simple-rest": "RefineSimpleRest",
    "@pankod/refine-react-hook-form": "RefineReactHookForm",
    "@pankod/refine-react-table": "RefineReactTable",
};

const packageRegex =
    /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g;

const sideEffectRegex = /import[ \n\t](?:['"])([^'"\n]+)(['"])/g;

// const nameChangeRegex = /((?:\w|\s|_)*)( as )((?:\w|\s|_)*)( |,)?/g;

// const getPackageByName = (packageName: string) => {
//     return packageMap[packageName.replace('"', "")];
// };

export const packageResolve = async (
    code: string,
): Promise<Record<string, unknown>> => {
    const packages: string[] = [];
    let match: (string | undefined)[];
    while ((match = packageRegex.exec(code))) {
        const [, , , , packageName] = match;

        packages.push(packageName);
    }
    let modules: Record<string, unknown> = {};

    if (
        packages.includes("@pankod/refine-antd") &&
        typeof window !== "undefined" &&
        typeof document !== "undefined"
    ) {
        const element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute(
            "href",
            "https://unpkg.com/@pankod/refine-antd/dist/antd.min.css",
        );
        document.head.appendChild(element);
    }
    if (packages.includes("@pankod/refine-antd")) {
        const { Antd } = await import("./antd");
        modules = { ...Antd };
    } else if (packages.includes("@pankod/refine-mui")) {
        const { Mui } = await import("./mui");
        modules = { ...Mui };
    } else {
        const { Core } = await import("./headless");
        modules = { ...Core };
    }

    if (packages.includes("@pankod/refine-react-hook-form")) {
        modules.RefineReactHookForm = await import(
            "@pankod/refine-react-hook-form"
        );
    }

    if (packages.includes("@pankod/refine-react-table")) {
        modules.RefineReactHookForm = await import(
            "@pankod/refine-react-table"
        );
    }

    return modules;
};

export const importReplacer = (code: string): string => {
    let modified = `${code}`;
    let match: (string | undefined)[];

    while ((match = packageRegex.exec(code))) {
        const [
            line /* _defaultImport, _moduleImport, _asteriskImport, _packageName */,
        ] = match;

        modified = modified.replace(line, "");

        // if (defaultImport) {
        // const newLine = `const { ${
        //     defaultImport ? `default: ${defaultImport}` : ""
        // } } = ${getPackageByName(packageName)}`;

        // modified = modified.replace(line, newLine);
        // }

        // if (moduleImport) {
        // const newLine = `const ${moduleImport.replace(
        //     nameChangeRegex,
        //     `$1: $3$4`,
        // )} = ${getPackageByName(packageName)}`;

        //     modified = modified.replace(line, newLine);
        // }

        // if (asteriskImport) {
        // const newLine = `const ${asteriskImport} = ${getPackageByName(
        //     packageName,
        // )}`;

        //     modified = modified.replace(line, newLine);
        // }
    }

    while ((match = sideEffectRegex.exec(code))) {
        const [line] = match;

        modified = modified.replace(line, "");
    }

    return modified;
};
// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
};
export default ReactLiveScope;
