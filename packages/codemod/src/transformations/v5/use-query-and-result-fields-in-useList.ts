import type { Collection, JSCodeshift } from "jscodeshift";
import { renamePaginationCurrentToCurrentPage } from "./rename-pagination-current-to-currentPage";

const HOOK_PACKAGE_MAPPINGS = {
  useList: ["@refinedev/core"],
  useMany: ["@refinedev/core"],
};

export const useQueryAndResultFieldsInUseList = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // First, apply the pagination transformation
  renamePaginationCurrentToCurrentPage(j, root);

  // Track which hooks are imported from which packages
  const hookSources = new Map<string, string[]>();

  // First pass: collect hook imports and their sources
  Object.keys(HOOK_PACKAGE_MAPPINGS).forEach((hookName) => {
    const supportedPackages = HOOK_PACKAGE_MAPPINGS[hookName];

    supportedPackages.forEach((packageName) => {
      root
        .find(j.ImportDeclaration, {
          source: { value: packageName },
        })
        .forEach((path) => {
          const importDecl = path.value;
          if (!importDecl.specifiers) return;

          const hasHook = importDecl.specifiers.some(
            (spec) =>
              spec.type === "ImportSpecifier" &&
              spec.imported.name === hookName,
          );

          if (hasHook) {
            if (!hookSources.has(hookName)) {
              hookSources.set(hookName, []);
            }
            hookSources.get(hookName)!.push(packageName);
          }
        });
    });
  });

  // Second pass: find and transform destructuring assignments for useList and useMany
  ["useList", "useMany"].forEach((hookName) => {
    if (!hookSources.has(hookName)) return;

    root
      .find(j.VariableDeclarator)
      .filter((path) => {
        const { node } = path;
        return (
          node.id?.type === "ObjectPattern" &&
          node.init?.type === "CallExpression" &&
          node.init.callee?.type === "Identifier" &&
          node.init.callee.name === hookName
        );
      })
      .forEach((path) => {
        const { node } = path;
        const objectPattern = node.id as any;

        // Transform the properties in the destructuring
        objectPattern.properties = objectPattern.properties.map((prop: any) => {
          if (
            (prop.type === "ObjectProperty" || prop.type === "Property") &&
            prop.key?.type === "Identifier" &&
            prop.key.name === "data"
          ) {
            // Handle cases like { data } -> { result: data }
            if (prop.shorthand) {
              return j.objectProperty(
                j.identifier("result"),
                j.identifier("data"),
              );
            }
            // Handle cases like { data: variableName } -> { result: variableName }
            return j.objectProperty(j.identifier("result"), prop.value);
          }
          return prop;
        });
      });
  });

  return root;
};

export default function transformer(
  j: JSCodeshift,
  root: Collection<any>,
): string {
  useQueryAndResultFieldsInUseList(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
}
