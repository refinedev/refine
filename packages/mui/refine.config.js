const {
    getImports,
    getNameChangeInImport,
    appendAfterImports,
} = require("@pankod/refine-cli");

/** @type {import('@pankod/refine-cli').RefineConfig} */
module.exports = {
    swizzle: {
        items: [
            {
                group: "Buttons",
                label: "ShowButton",
                files: [
                    {
                        src: "./src/components/buttons/show/index.tsx",
                        dest: "./src/components/buttons/show.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "CreateButton",
                files: [
                    {
                        src: "./src/components/buttons/create/index.tsx",
                        dest: "./src/components/buttons/create.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "CloneButton",
                files: [
                    {
                        src: "./src/components/buttons/clone/index.tsx",
                        dest: "./src/components/buttons/clone.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "DeleteButton",
                files: [
                    {
                        src: "./src/components/buttons/delete/index.tsx",
                        dest: "./src/components/buttons/delete.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "EditButton",
                files: [
                    {
                        src: "./src/components/buttons/edit/index.tsx",
                        dest: "./src/components/buttons/edit.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "ExportButton",
                files: [
                    {
                        src: "./src/components/buttons/export/index.tsx",
                        dest: "./src/components/buttons/export.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "ImportButton",
                files: [
                    {
                        src: "./src/components/buttons/import/index.tsx",
                        dest: "./src/components/buttons/import.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "ListButton",
                files: [
                    {
                        src: "./src/components/buttons/list/index.tsx",
                        dest: "./src/components/buttons/list.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "RefreshButton",
                files: [
                    {
                        src: "./src/components/buttons/refresh/index.tsx",
                        dest: "./src/components/buttons/refresh.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "SaveButton",
                files: [
                    {
                        src: "./src/components/buttons/save/index.tsx",
                        dest: "./src/components/buttons/save.tsx",
                    },
                ],
            },
            {
                group: "Basic Views",
                label: "Create",
                files: [
                    {
                        src: "./src/components/crud/create/index.tsx",
                        dest: "./src/components/crud/create.tsx",
                    },
                ],
            },
            {
                group: "Pages",
                label: "Error",
                files: [
                    {
                        src: "./src/components/pages/error/index.tsx",
                        dest: "./src/components/pages/error.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for remove RefineErorrPageProps
                            const refineErrorPagePropsRegex =
                                /React\.FC<RefineErrorPageProps>/g;

                            newContent = newContent.replace(
                                refineErrorPagePropsRegex,
                                "React.FC",
                            );

                            return newContent;
                        },
                    },
                ],
            },
            {
                group: "Fields",
                label: "BooleanField",
                files: [
                    {
                        src: "./src/components/fields/boolean/index.tsx",
                        dest: "./src/components/fields/boolean.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "DateField",
                files: [
                    {
                        src: "./src/components/fields/date/index.tsx",
                        dest: "./src/components/fields/date.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "EmailField",
                files: [
                    {
                        src: "./src/components/fields/email/index.tsx",
                        dest: "./src/components/fields/email.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "FileField",
                files: [
                    {
                        src: "./src/components/fields/file/index.tsx",
                        dest: "./src/components/fields/file.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "FileField",
                files: [
                    {
                        src: "./src/components/fields/file/index.tsx",
                        dest: "./src/components/fields/file.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "MarkdownField",
                files: [
                    {
                        src: "./src/components/fields/markdown/index.tsx",
                        dest: "./src/components/fields/markdown.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "NumberField",
                files: [
                    {
                        src: "./src/components/fields/number/index.tsx",
                        dest: "./src/components/fields/number.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "TagField",
                files: [
                    {
                        src: "./src/components/fields/tag/index.tsx",
                        dest: "./src/components/fields/tag.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "TextField",
                files: [
                    {
                        src: "./src/components/fields/text/index.tsx",
                        dest: "./src/components/fields/text.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "UrlField",
                files: [
                    {
                        src: "./src/components/fields/url/index.tsx",
                        dest: "./src/components/fields/url.tsx",
                    },
                ],
            },
            {
                group: "Auth",
                label: "AuthPage",
                files: [
                    {
                        src: "./src/components/pages/auth/index.tsx",
                        dest: "./src/components/pages/auth/index.tsx",
                    },
                    {
                        src: "./src/components/pages/auth/components/forgotPassword/index.tsx",
                        dest: "./src/components/pages/auth/components/forgotPassword.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for change style import path
                            const styleImportRegex = /"\.\.\/styles";/g;

                            newContent = newContent.replace(
                                styleImportRegex,
                                `"./styles";`,
                            );

                            // for change index import path
                            const indexImportRegex = /"\.\.\/\.\.\/index";/g;

                            newContent = newContent.replace(
                                indexImportRegex,
                                `"../index";`,
                            );

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/pages/auth/components/login/index.tsx",
                        dest: "./src/components/pages/auth/components/login.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for change style import path
                            const styleImportRegex = /"\.\.\/styles";/g;

                            newContent = newContent.replace(
                                styleImportRegex,
                                `"./styles";`,
                            );

                            // for change index import path
                            const indexImportRegex = /"\.\.\/\.\.\/index";/g;

                            newContent = newContent.replace(
                                indexImportRegex,
                                `"../index";`,
                            );

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/pages/auth/components/register/index.tsx",
                        dest: "./src/components/pages/auth/components/register.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for change style import path
                            const styleImportRegex = /"\.\.\/styles";/g;

                            newContent = newContent.replace(
                                styleImportRegex,
                                `"./styles";`,
                            );

                            // for change index import path
                            const indexImportRegex = /"\.\.\/\.\.\/index";/g;

                            newContent = newContent.replace(
                                indexImportRegex,
                                `"../index";`,
                            );

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/pages/auth/components/updatePassword/index.tsx",
                        dest: "./src/components/pages/auth/components/updatePassword.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for change style import path
                            const styleImportRegex = /"\.\.\/styles";/g;

                            newContent = newContent.replace(
                                styleImportRegex,
                                `"./styles";`,
                            );

                            // for change index import path
                            const indexImportRegex = /"\.\.\/\.\.\/index";/g;

                            newContent = newContent.replace(
                                indexImportRegex,
                                `"../index";`,
                            );

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/pages/auth/components/index.tsx",
                        dest: "./src/components/pages/auth/components/index.tsx",
                    },
                    {
                        src: "./src/components/pages/auth/components/styles.ts",
                        dest: "./src/components/pages/auth/components/styles.ts",
                    },
                ],
            },
            {
                group: "Other",
                label: "Breadcrumb",
                files: [
                    {
                        src: "./src/components/breadcrumb/index.tsx",
                        dest: "./src/components/breadcrumb.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for remove type export
                            const breadcrumbPropsExportRegex =
                                /export type BreadcrumbProps = RefineBreadcrumbProps<MuiBreadcrumbProps>;?/g;

                            newContent = newContent.replace(
                                breadcrumbPropsExportRegex,
                                "",
                            );

                            // change the breadcrumb import path
                            const breadcrumbImportRegex =
                                /BreadcrumbsProps as MuiBreadcrumbProps,/g;

                            newContent = newContent.replace(
                                breadcrumbImportRegex,
                                "BreadcrumbProps,",
                            );

                            return newContent;
                        },
                    },
                ],
            },
            {
                group: "Other",
                label: "Layout",
                files: [
                    {
                        src: "./src/components/layout/sider/index.tsx",
                        dest: "./src/components/layout/sider.tsx",
                        transform: (content) => {
                            let newContent = content;
                            const imports = getImports(content);

                            imports.map((importItem) => {
                                // handle antd layout rename
                                if (importItem.importPath === "@mui/material") {
                                    newContent = newContent.replace(
                                        importItem.statement,
                                        importItem.statement.replace(
                                            "List,",
                                            "MuiList,",
                                        ),
                                    );

                                    // replace "<List" with "<MuiList" but <List must be followed by a space or an end of line
                                    newContent = newContent.replace(
                                        /<List(?=[\s>])/g,
                                        "<MuiList",
                                    );
                                    // replace "</List" with "</MuiList"
                                    newContent = newContent.replace(
                                        /<\/List>/g,
                                        "</MuiList>",
                                    );
                                }

                                // handle @components import replacement
                                if (importItem.importPath === "@components") {
                                    const newStatement = `import ${importItem.namedImports} from "@pankod/refine-mui";`;

                                    newContent = newContent.replace(
                                        importItem.statement,
                                        newStatement,
                                    );
                                }
                            });

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/layout/header/index.tsx",
                        dest: "./src/components/layout/header.tsx",
                    },
                    {
                        src: "./src/components/layout/title/index.tsx",
                        dest: "./src/components/layout/title.tsx",
                    },
                    {
                        src: "./src/components/layout/index.tsx",
                        dest: "./src/components/layout/index.tsx",
                        transform: (content) => {
                            let newContent = content;
                            const imports = getImports(content);

                            imports.map((importItem) => {
                                // handle antd layout rename
                                if (importItem.importPath === "antd") {
                                    newContent = newContent.replace(
                                        importItem.statement,
                                        importItem.statement.replace(
                                            "Layout as AntdLayout,",
                                            "AntdLayout,",
                                        ),
                                    );
                                }
                            });

                            return newContent;
                        },
                    },
                ],
            },
        ],
        transform: (content) => {
            let newContent = content;
            const imports = getImports(content);

            imports.map((importItem) => {
                // for mui imports
                if (
                    importItem.importPath === "@mui/material" ||
                    importItem.importPath === "@mui/lab"
                ) {
                    const newStatement = `import ${importItem.namedImports} from "@pankod/refine-mui";`;

                    newContent = newContent.replace(
                        importItem.statement,
                        newStatement,
                    );
                }

                // for icons
                if (importItem.importPath === "@mui/icons-material") {
                    const newStatement = `
                    // We use @mui/icons-material for icons but you can use any icon library you want.
                    import ${importItem.namedImports} from "@mui/icons-material";`;

                    newContent = newContent.replace(
                        importItem.statement,
                        newStatement,
                    );
                }

                // for ui-types
                if (importItem.importPath === "@pankod/refine-ui-types") {
                    newContent = newContent.replace(importItem.statement, "");

                    // prop is data-testid
                    // remove data-testid={*} from props
                    const testIdPropRegex = /data-testid={.*?}/g;

                    newContent = newContent.replace(testIdPropRegex, "");
                }

                // for prop types
                if (
                    importItem.importPath === "../types" ||
                    importItem.importPath === "./types"
                ) {
                    const newStatement = `import type ${importItem.namedImports} from "@pankod/refine-mui";`;

                    newContent = newContent.replace(
                        importItem.statement,
                        newStatement,
                    );
                }
            });

            return newContent;
        },
    },
};
