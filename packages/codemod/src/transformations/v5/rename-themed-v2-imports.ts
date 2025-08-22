import type { Collection, JSCodeshift } from "jscodeshift";

const SUPPORTED_PACKAGES = [
  "@refinedev/mui",
  "@refinedev/antd",
  "@refinedev/mantine",
  "@refinedev/chakra-ui",
];

const COMPONENT_MAPPINGS = {
  ThemedLayoutV2: "ThemedLayout",
  ThemedTitleV2: "ThemedTitle",
  ThemedSiderV2: "ThemedSider",
  ThemedHeaderV2: "ThemedHeader",
};

export const renameThemedV2Imports = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  SUPPORTED_PACKAGES.forEach((packageName) => {
    // Check if any of the new component names already exist in imports
    const hasNewComponents = Object.values(COMPONENT_MAPPINGS).some(
      (newName) =>
        root
          .find(j.ImportDeclaration, {
            source: { value: packageName },
          })
          .find(j.ImportSpecifier, {
            imported: { name: newName },
          }).length > 0,
    );

    if (hasNewComponents) {
      return;
    }

    // Find import declarations from the current package that have any V2 components
    root
      .find(j.ImportDeclaration, {
        source: { value: packageName },
      })
      .forEach((path) => {
        const importDecl = path.value;
        if (!importDecl.specifiers) return;

        // Check if this import has any V2 components
        const hasV2Components = importDecl.specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            Object.keys(COMPONENT_MAPPINGS).includes(spec.imported.name),
        );

        if (!hasV2Components) return;

        // Replace V2 component specifiers
        importDecl.specifiers = importDecl.specifiers.map((spec) => {
          if (
            spec.type === "ImportSpecifier" &&
            Object.keys(COMPONENT_MAPPINGS).includes(spec.imported.name)
          ) {
            const oldName = spec.imported.name;
            const newName = COMPONENT_MAPPINGS[oldName];

            // Check if the import has a user-defined alias
            const hasUserAlias =
              spec.local && spec.local.name !== spec.imported.name;
            const localName = hasUserAlias ? spec.local.name : oldName;

            // Create new specifier with NewName as LocalName
            const newSpec = j.importSpecifier(
              j.identifier(newName),
              j.identifier(localName),
            );

            // Copy importKind if it exists (for type imports)
            if ((spec as any).importKind) {
              (newSpec as any).importKind = (spec as any).importKind;
            }

            return newSpec;
          }
          return spec;
        });
      });
  });

  return root;
};
