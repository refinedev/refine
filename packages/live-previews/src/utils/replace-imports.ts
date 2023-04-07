import { packageMap } from "@/src/scope/map";
import { isDevelopmentModeByCookie } from "./development-cookie";
import { prettySpaces } from "./pretty-spaces";

const packageRegex =
    /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(?:['"])(?:;?)/g;
//
const sideEffectRegex = /import[ \n\t](?:['"])([^'"\n]+)(?:['"])(?:;?)/g;

const nameChangeRegex = /((?:\w|\s|_)*)( as )((?:\w|\s|_)*)( |,)?/g;

export const replaceImports = (content: string): string => {
    const matches = content.matchAll(packageRegex);

    const imports = new Set();

    for (const match of matches) {
        const [, defaultImport, namedImports, namespaceImport, packageName] =
            match;
        //
        if (packageName in packageMap) {
            const importName = packageMap[packageName];

            if (defaultImport) {
                imports.add(
                    `const { default: ${defaultImport} } = ${importName};`,
                );
            }

            if (namedImports) {
                imports.add(
                    `const${namedImports.replace(
                        nameChangeRegex,
                        `$1: $3$4`,
                    )} = ${importName};`,
                );
            }

            if (namespaceImport) {
                imports.add(`const ${namespaceImport} = ${importName};`);
            }
        }
    }

    const pretty = prettySpaces(`
    ${Array.from(imports).join("\n")}
    ${content
        .replace(packageRegex, "")
        .replace(sideEffectRegex, "")
        .replace(
            "React.createElement(GoogleButton,",
            "React.createElement(MockGoogleButton,",
        )}
    `);

    if (isDevelopmentModeByCookie()) {
        console.log("== Incoming Code ==");
        console.log(content);
        console.log("== ==");
        console.log("== Transformed Code ==");
        console.log(pretty);
        console.log("== ==");
    }

    return pretty;
};
