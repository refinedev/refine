"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
function _optionalChain(ops) {
    let lastAccessLHS = undefined;
    let value = ops[0];
    let i = 1;
    while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];
        i += 2;
        if (
            (op === "optionalAccess" || op === "optionalCall") &&
            value == null
        ) {
            return undefined;
        }
        if (op === "access" || op === "optionalAccess") {
            lastAccessLHS = value;
            value = fn(value);
        } else if (op === "call" || op === "optionalCall") {
            value = fn((...args) => value.call(lastAccessLHS, ...args));
            lastAccessLHS = undefined;
        }
    }
    return value;
}
//

var _reactdocgentypescript = require("react-docgen-typescript");
var _path = require("path");
var _path2 = _interopRequireDefault(_path);
var _fsextra = require("fs-extra");
var _fsextra2 = _interopRequireDefault(_fsextra);

/** TYPES */

/** CONSTANTS */
const packagesDir = _path2.default.join(__dirname, "./../..", "./packages");

const packagePrefix = "@pankod";

const sourceDir = "./src";

const outputDir = _path2.default.join(
    __dirname,
    "./../",
    "./src/assets/docgen",
);

const outputFileName = "docgen.json";

const excludedFilePatterns = [
    "node_modules",
    "tsup.config.ts",
    ".test.",
    ".spec.",
];

const excludePropPatterns = [/^__.*/];

const excludedProps = [
    "className",
    "classNames",
    "styles",
    "unstyled",
    "component",
    "key",
    "ref",
    "style",
    "sx",
    "m",
    "mx",
    "my",
    "mt",
    "ml",
    "mr",
    "mb",
    "p",
    "px",
    "py",
    "pt",
    "pl",
    "pr",
    "pb",
];

const replacementProps = {
    // "null | string | number | false | true | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal": "ReactNode",
    ReactElement:
        "ReactElement<any, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)>",
    "ReactNode | (value: number) => ReactNode":
        "string | number | boolean | {} | ReactElement<any, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> | ReactNodeArray | ReactPortal | ((value: number) => ReactNode)",
    ActionButtonRenderer:
        "ReactNode | ({ defaultButtons: ReactNode }) => ReactNode",
    "DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>":
        "DetailedHTMLProps<HTMLDivElement>",
};

/** HELPERS */
const getPackageNamePathMap = async (directory) => {
    const packages = await _fsextra2.default.readdir(directory);
    const packageNamePathMap = {};

    await Promise.all(
        packages.map(async (packageName) => {
            const packagePath = _path2.default.join(
                directory,
                packageName,
                "package.json",
            );

            if (_fsextra2.default.existsSync(packagePath)) {
                const packageJson = await _fsextra2.default.readJSON(
                    packagePath,
                );

                packageNamePathMap[packageJson.name] = _path2.default.join(
                    packagePath,
                    "..",
                );
            }

            return packageName;
        }),
    );

    return packageNamePathMap;
};

const getPaths = async (packageDir, excludedPatterns) => {
    const dir = await _fsextra2.default.readdir(packageDir);
    const filtered = [];
    await Promise.all(
        dir.map(async (file) => {
            const result = await _fsextra2.default.pathExists(
                _path2.default.join(packageDir, file),
            );
            if (result) {
                filtered.push(file);
            }
        }),
    );

    return filtered
        .map((p) => _path2.default.join(packageDir, p))
        .filter(
            (p) => !excludedPatterns.some((pattern) => p.includes(pattern)),
        );
};

const _getPrefixFromDeclarationPath = async (path) => {
    const map = await getPackageNamePathMap(packagesDir);
    const packageName = Object.keys(map).find((key) => path.includes(map[key]));
    return packageName;
};

const getComponentName = (name, _fileName) => {
    return name;
    // return `${getPrefixFromDeclarationPath(fileName)}#${name}`;
};

const writeDeclarationsToFile = (filePath, declarations) => {
    _fsextra2.default.writeJSONSync(filePath, declarations, {
        spaces: 2,
    });
};

const getOutputName = (packageName) => {
    return packageName;
    // return packageName.replace(`${packagePrefix}/`, "");
};

const getOutputFileName = (packageName, dir) => {
    const fileName = `${getOutputName(packageName)}.json`;
    const filePath = _path2.default.join(dir, fileName);

    return filePath;
};

const declarationFilter = (declaration) => {
    return (
        !declaration.fileName.includes("node_modules") ||
        declaration.fileName.includes("@pankod")
    );
};

const createParser = (configPath) => {
    const docgenParser = _reactdocgentypescript.withCustomConfig.call(
        void 0,
        _path2.default.join(configPath),
        {
            savePropValueAsString: true,
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            shouldIncludePropTagMap: true,

            componentNameResolver: (exp, source) => {
                return getComponentName(exp.getName(), source.fileName);
            },
            propFilter: (prop) => {
                const isExcluded =
                    excludedProps.includes(prop.name) ||
                    excludePropPatterns.some((pattern) =>
                        pattern.test(prop.name),
                    );

                const isExternal =
                    prop.declarations &&
                    prop.declarations.length > 0 &&
                    !Boolean(prop.declarations.find(declarationFilter));

                if (isExcluded || isExternal) {
                    return false;
                }
                return true;
            },
        },
    );

    return docgenParser;
};

const prepareDeclaration = (declaration) => {
    const data = { ...declaration };
    delete data.methods;
    delete data.tags;

    data.generatedAt = Date.now();

    Object.keys(data.props).forEach((prop) => {
        delete data.props[prop].parent;
        delete data.props[prop].declarations;

        if (data.props[prop].type.raw === "ReactNode") {
            data.props[prop].type.name = "ReactNode";
        }

        if (data.props[prop].type.name in replacementProps) {
            data.props[prop].type.name =
                replacementProps[data.props[prop].type.name];
        }

        if (data.props[prop].type.name === "enum") {
            data.props[prop].type.name = data.props[prop].type.value
                .map((val) => val.value)
                .join(" | ");
        }
    });

    const ordered = Object.keys(data.props)
        .sort()
        .reduce((obj, key) => {
            obj[key] = data.props[key];
            return obj;
        }, {});

    data.props = ordered;

    return data;
};

const transposeDeclarations = (declarations) => {
    const transposed = {};

    declarations.forEach((declaration) => {
        transposed[declaration.displayName] = declaration;
    });

    return transposed;
};

const generateDeclarations = async (packagePaths) => {
    const generated = {};

    await Promise.all(
        packagePaths.map(async ([packageName, packagePath]) => {
            const parser = createParser(
                _path2.default.join(packagePath, "./tsconfig.json"),
            );

            const sourcePath = _path2.default.join(packagePath, sourceDir);

            if (!(await _fsextra2.default.pathExists(sourcePath))) {
                console.log("Component path does not exist", sourcePath);
                process.exit(1);
            }

            const declarationPaths = await getPaths(
                sourcePath,
                excludedFilePatterns,
            );

            const parsed = parser
                .parse(declarationPaths)
                .map(prepareDeclaration);

            const transposed = transposeDeclarations(parsed);

            const outputName = getOutputName(packageName);

            // const outputFileName = getOutputFileName(packageName, outputDir);

            // writeDeclarationsToFile(outputFileName, transposed);

            generated[outputName] = transposed;

            console.log(`- Generated declarations - ${packageName}`);

            return [packageName, packagePath];
        }),
    );

    return generated;

    // writeDeclarationsToFile(path.join(outputDir, outputFileName), generated);
};

/** DOCGEN */
const handleDocgen = async () => {
    const packagePathMap = await getPackageNamePathMap(packagesDir);
    const packagePathMapArray = Object.entries(packagePathMap);

    console.log(`- Found ${packagePathMapArray.length} packages`);

    // if (!fs.existsSync(outputDir)) {
    //     console.log(`- Creating output directory`);
    //     fs.mkdirSync(outputDir, { recursive: true });
    // }

    return await generateDeclarations(packagePathMapArray);

    // console.log(`- Saved declarations to ${outputDir}`);
};

function plugin() {
    return {
        name: "docusaurus-plugin-refine-docgen",
        getPathsToWatch: function () {
            return [packagesDir];
        },
        async loadContent() {
            console.log("Generating Refine declarations...");
            return await handleDocgen();
        },
        configureWebpack(config) {
            return {
                resolve: {
                    alias: {
                        "@docgen": _path2.default.join(
                            _optionalChain([
                                config,
                                "access",
                                (_) => _.resolve,
                                "optionalAccess",
                                (_2) => _2.alias,
                                "optionalAccess",
                                (_3) => _3["@generated"],
                            ]),
                            "docusaurus-plugin-refine-docgen",
                            "default",
                        ),
                    },
                },
            };
        },
        async contentLoaded({ content, actions }) {
            console.log("Creating Refine declaration files...");

            const { createData } = actions;

            Object.entries(content).forEach(
                ([packageName, packageDeclarations]) => {
                    Object.entries(packageDeclarations).forEach(
                        ([componentName, declaration]) => {
                            createData(
                                `${packageName}/${componentName}.json`,
                                JSON.stringify(declaration),
                            );
                        },
                    );
                },
            );
        },
    };
}
exports.default = plugin;
