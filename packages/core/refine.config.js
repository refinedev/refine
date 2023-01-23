const { getImports, appendAfterImports } = require("@pankod/refine-cli");

/** @type {import('@pankod/refine-cli').RefineConfig} */
module.exports = {
    group: "UI Framework",
    swizzle: {
        items: [
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
                    },
                    {
                        src: "./src/components/pages/auth/components/login/index.tsx",
                        dest: "./components/pages/auth/components/login.tsx",
                    },
                    {
                        src: "./src/components/pages/auth/components/register/index.tsx",
                        dest: "./components/pages/auth/components/register.tsx",
                    },
                    {
                        src: "./src/components/pages/auth/components/updatePassword/index.tsx",
                        dest: "./components/pages/auth/components/updatePassword.tsx",
                    },
                    {
                        src: "./src/components/pages/auth/components/index.ts",
                        dest: "./components/pages/auth/components/index.ts",
                    },
                ],
            },
            {
                group: "Other",
                label: "CanAccess",
                files: [
                    {
                        src: "./src/components/canAccess/index.tsx",
                        dest: "./components/canAccess.tsx",
                    },
                ],
            },
        ],
        transform: (content) => {
            let newContent = content;
            const imports = getImports(content);

            imports.map((importItem) => {
                if (
                    importItem.importPath === "../../../../../interfaces" ||
                    importItem.importPath === "../../../interfaces" ||
                    importItem.importPath === "../../interfaces" ||
                    importItem.importPath === "@hooks" ||
                    importItem.importPath === "@hooks/translate"
                ) {
                    const newStatement = `import ${importItem.namedImports} from "@pankod/refine-core";`;

                    newContent = newContent.replace(
                        importItem.statement,
                        newStatement,
                    );
                }

                if (importItem.importPath === "../..") {
                    const typesLine = `
                    type DivPropsType = React.DetailedHTMLProps<
                        React.HTMLAttributes<HTMLDivElement>,
                        HTMLDivElement
                    >;
                    type FormPropsType = React.DetailedHTMLProps<
                        React.FormHTMLAttributes<HTMLFormElement>,
                        HTMLFormElement
                    >;
                    `;

                    newContent = newContent.replace(importItem.statement, "");

                    newContent = appendAfterImports(newContent, typesLine);
                }
            });

            return newContent;
        },
    },
};
