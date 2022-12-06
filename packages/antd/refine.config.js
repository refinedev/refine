const { dirname, join } = require("path");
const {
    getImports,
    appendAfterImports,
    getFileContent,
} = require("@pankod/refine-cli");

/** @type {import('@pankod/refine-cli').RefineConfig} */
module.exports = {
    group: "UI Framework",
    swizzle: {
        items: [
            {
                group: "Buttons",
                label: "ShowButton",
                files: [
                    {
                        src: "./src/components/buttons/show/index.tsx",
                        dest: "./components/buttons/show.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "CreateButton",
                message: ` 
                **\`Warning:\`**
                This component is used in the below component. If you want to change it, you can run the **swizzle** command for the below component or you can use props to override the default buttons.
                    - <List/>
                `,
                files: [
                    {
                        src: "./src/components/buttons/create/index.tsx",
                        dest: "./components/buttons/create.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "CloneButton",
                files: [
                    {
                        src: "./src/components/buttons/clone/index.tsx",
                        dest: "./components/buttons/clone.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "DeleteButton",
                message: ` 
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can run the **swizzle** command for the below components or you can use props to override the default buttons.
                    - <Edit/>
                    - <List/>
                `,
                files: [
                    {
                        src: "./src/components/buttons/delete/index.tsx",
                        dest: "./components/buttons/delete.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "EditButton",
                message: ` 
                **\`Warning:\`**
                This component is used in the below component. If you want to change it, you can run the **swizzle** command for the below component or you can use props to override the default buttons.
                    - <Show/>
                `,
                files: [
                    {
                        src: "./src/components/buttons/edit/index.tsx",
                        dest: "./components/buttons/edit.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "ExportButton",
                files: [
                    {
                        src: "./src/components/buttons/export/index.tsx",
                        dest: "./components/buttons/export.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "ImportButton",
                files: [
                    {
                        src: "./src/components/buttons/import/index.tsx",
                        dest: "./components/buttons/import.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "ListButton",
                message: ` 
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can run the **swizzle** command for the below components or you can use props to override the default buttons.
                    - <Edit/>
                    - <Show/>
                `,
                files: [
                    {
                        src: "./src/components/buttons/list/index.tsx",
                        dest: "./components/buttons/list.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "RefreshButton",
                message: ` 
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can run the **swizzle** command for the below components or you can use props to override the default buttons.
                    - <Edit/>
                    - <Show/>
                `,
                files: [
                    {
                        src: "./src/components/buttons/refresh/index.tsx",
                        dest: "./components/buttons/refresh.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "SaveButton",
                message: ` 
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can run the **swizzle** command for the below components or you can use props to override the default buttons.
                    - <Create/>
                    - <Edit/>
                `,
                files: [
                    {
                        src: "./src/components/buttons/save/index.tsx",
                        dest: "./components/buttons/save.tsx",
                    },
                ],
            },
            {
                group: "Basic Views",
                label: "Create",
                files: [
                    {
                        src: "./src/components/crud/create/index.tsx",
                        dest: "./components/crud/create.tsx",
                    },
                ],
            },
            {
                group: "Basic Views",
                label: "List",
                files: [
                    {
                        src: "./src/components/crud/list/index.tsx",
                        dest: "./components/crud/list.tsx",
                    },
                ],
            },
            {
                group: "Basic Views",
                label: "Show",
                files: [
                    {
                        src: "./src/components/crud/show/index.tsx",
                        dest: "./components/crud/show.tsx",
                    },
                ],
            },
            {
                group: "Basic Views",
                label: "Edit",
                files: [
                    {
                        src: "./src/components/crud/edit/index.tsx",
                        dest: "./components/crud/edit.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "BooleanField",
                files: [
                    {
                        src: "./src/components/fields/boolean/index.tsx",
                        dest: "./components/fields/boolean.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "DateField",
                files: [
                    {
                        src: "./src/components/fields/date/index.tsx",
                        dest: "./components/fields/date.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "EmailField",
                files: [
                    {
                        src: "./src/components/fields/email/index.tsx",
                        dest: "./components/fields/email.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "FileField",
                files: [
                    {
                        src: "./src/components/fields/file/index.tsx",
                        dest: "./components/fields/file.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "ImageField",
                files: [
                    {
                        src: "./src/components/fields/image/index.tsx",
                        dest: "./components/fields/image.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "MarkdownField",
                files: [
                    {
                        src: "./src/components/fields/markdown/index.tsx",
                        dest: "./components/fields/markdown.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "NumberField",
                files: [
                    {
                        src: "./src/components/fields/number/index.tsx",
                        dest: "./components/fields/number.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "TagField",
                files: [
                    {
                        src: "./src/components/fields/tag/index.tsx",
                        dest: "./components/fields/tag.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "TextField",
                files: [
                    {
                        src: "./src/components/fields/text/index.tsx",
                        dest: "./components/fields/text.tsx",
                    },
                ],
            },
            {
                group: "Fields",
                label: "UrlField",
                files: [
                    {
                        src: "./src/components/fields/url/index.tsx",
                        dest: "./components/fields/url.tsx",
                    },
                ],
            },
            {
                group: "Pages",
                label: "ErrorPage",
                message: ` 
                **\`Warning:\`**
                If you want to change the default error page;
                You should pass it with the **catchAll** prop to the **<Refine/>** component.

                \`\`\`
                // title: App.tsx
                import { ErrorPage } from "components/pages/error";

                const App = () => {
                    return (
                        <Refine
                            catchAll={ErrorPage}
                            /* ... */
                        />
                    );
                }
                \`\`\`
                `,
                files: [
                    {
                        src: "./src/components/pages/error/index.tsx",
                        dest: "./components/pages/error.tsx",
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
                group: "Pages",
                label: "AuthPage",
                message: ` 
                **\`Warning:\`**
                If you want to change the default auth pages;
                You should pass it with the **LoginPage** prop to the **<Refine/>** component.

                \`\`\`
                // title: App.tsx
                import { AuthPage } from "components/pages/auth";

                const App = () => {
                    return (
                        <Refine
                            LoginPage={AuthPage}
                            /* ... */
                        />
                    );
                }
                \`\`\`
                `,
                files: [
                    {
                        src: "./src/components/pages/auth/index.tsx",
                        dest: "./components/pages/auth/index.tsx",
                    },
                    {
                        src: "./src/components/pages/auth/components/forgotPassword/index.tsx",
                        dest: "./components/pages/auth/components/forgotPassword.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for change style import path
                            const styleImportRegex = /"\.\.\/styles";/g;

                            newContent = newContent.replace(
                                styleImportRegex,
                                `"./styles";`,
                            );

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/pages/auth/components/login/index.tsx",
                        dest: "./components/pages/auth/components/login.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for change style import path
                            const styleImportRegex = /"\.\.\/styles";/g;

                            newContent = newContent.replace(
                                styleImportRegex,
                                `"./styles";`,
                            );

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/pages/auth/components/register/index.tsx",
                        dest: "./components/pages/auth/components/register.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for change style import path
                            const styleImportRegex = /"\.\.\/styles";/g;

                            newContent = newContent.replace(
                                styleImportRegex,
                                `"./styles";`,
                            );

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/pages/auth/components/updatePassword/index.tsx",
                        dest: "./components/pages/auth/components/updatePassword.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for change style import path
                            const styleImportRegex = /"\.\.\/styles";/g;

                            newContent = newContent.replace(
                                styleImportRegex,
                                `"./styles";`,
                            );

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/pages/auth/components/index.tsx",
                        dest: "./components/pages/auth/components/index.tsx",
                    },
                    {
                        src: "./src/components/pages/auth/components/styles.ts",
                        dest: "./components/pages/auth/components/styles.ts",
                    },
                ],
            },
            {
                group: "Other",
                label: "Breadcrumb",
                message: `
                **\`Warning:\`**
                This component is used in the below components. If you want to change it, you can use props to override the default breadcrumb or you can manage globally with the **options** prop to the **<Refine/>** component.
                    - <Edit/>
                    - <List/>
                    - <Show/>
                    - <Create/>

                **\`Passing Breadcrumb Globally:\`**

                \`\`\`
                // title: App.tsx
                import { Breadcrumb } from "components/breadcrumb";

                const App = () => {
                    return (
                        <Refine
                            options={{
                                breadcrumb: <Breadcrumb />
                                /* ... */
                            }}
                            /* ... */
                        />
                    );
                }
                \`\`\`
                `,
                files: [
                    {
                        src: "./src/components/breadcrumb/index.tsx",
                        dest: "./components/breadcrumb.tsx",
                        transform: (content) => {
                            let newContent = content;

                            // for remove type export
                            const breadcrumbPropsExportRegex =
                                /export type BreadcrumbProps = RefineBreadcrumbProps<AntdBreadcrumbProps>;?/g;

                            newContent = newContent.replace(
                                breadcrumbPropsExportRegex,
                                "",
                            );

                            // change the breadcrumb import path
                            const breadcrumbImportRegex =
                                /Breadcrumb as AntdBreadcrumb,\n\s*BreadcrumbProps as AntdBreadcrumbProps,/g;

                            newContent = newContent.replace(
                                breadcrumbImportRegex,
                                "AntdBreadcrumb,\nBreadcrumbProps,",
                            );

                            return newContent;
                        },
                    },
                ],
            },
            {
                group: "Other",
                label: "Layout",
                message: `
                **\`Warning:\`**
                If you want to change the default layout;
                You should pass \`layout/index.tsx\` with the **Layout** prop to the **<Refine/>** component.

                \`\`\`
                // title: App.tsx
                import { Layout } from "components/layout";

                const App = () => {
                    return (
                        <Refine
                            Layout={Layout}
                            /* ... */
                        />
                    );
                }
                \`\`\`
                `,
                files: [
                    {
                        src: "./src/components/layout/sider/index.tsx",
                        dest: "./components/layout/sider.tsx",
                        transform: (content) => {
                            let newContent = content;
                            const imports = getImports(content);

                            imports.map((importItem) => {
                                // handle antd layout rename
                                if (importItem.importPath === "antd") {
                                    newContent = newContent.replace(
                                        importItem.statement,
                                        importItem.statement.replace(
                                            "Layout,",
                                            "AntdLayout,",
                                        ),
                                    );

                                    newContent = newContent.replace(
                                        /Layout\.Sider/g,
                                        "AntdLayout.Sider",
                                    );
                                }

                                // handle @components import replacement
                                if (importItem.importPath === "@components") {
                                    const newStatement = `import ${importItem.namedImports} from "@pankod/refine-antd";`;

                                    newContent = newContent.replace(
                                        importItem.statement,
                                        newStatement,
                                    );
                                }

                                // add content of ./styles.ts and remove import
                                if (importItem.importPath === "./styles") {
                                    newContent = newContent.replace(
                                        importItem.statement,
                                        "",
                                    );

                                    let appending = "";

                                    try {
                                        const stylesContent = getFileContent(
                                            join(
                                                dirname(
                                                    "./src/components/layout/sider/index.tsx",
                                                ),
                                                "/styles.ts",
                                            ),
                                            "utf-8",
                                        ).replace("export const", "const");

                                        appending = stylesContent;
                                    } catch (err) {
                                        // console.log(err);
                                    }

                                    newContent = appendAfterImports(
                                        newContent,
                                        appending,
                                    );
                                }
                            });

                            return newContent;
                        },
                    },
                    {
                        src: "./src/components/layout/header/index.tsx",
                        dest: "./components/layout/header.tsx",
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
                    {
                        src: "./src/components/layout/title/index.tsx",
                        dest: "./components/layout/title.tsx",
                    },
                    {
                        src: "./src/components/layout/index.tsx",
                        dest: "./components/layout/index.tsx",
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
                // for antd imports
                if (
                    importItem.importPath === "antd" ||
                    importItem.importPath === "@components"
                ) {
                    const newStatement = `import ${importItem.namedImports} from "@pankod/refine-antd";`;

                    newContent = newContent.replace(
                        importItem.statement,
                        newStatement,
                    );
                }

                // for icons
                if (importItem.importPath === "@ant-design/icons") {
                    const newStatement = `import { Icons } from "@pankod/refine-antd";`;

                    const iconsLine = `
                    const ${importItem.namedImports} = Icons;
                    `;

                    newContent = newContent.replace(
                        importItem.statement,
                        newStatement,
                    );

                    newContent = appendAfterImports(newContent, iconsLine);
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
                    const newStatement = `import type ${importItem.namedImports} from "@pankod/refine-antd";`;

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
