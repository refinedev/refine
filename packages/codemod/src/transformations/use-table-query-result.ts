import type { API, FileInfo } from "jscodeshift";

// ```diff
// - const { tableQueryResult } = useTable();
// + const { tableQuery } = useTable();
// ```
export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  const renameProperties = (prop) => {
    // just a type guard
    if ("shorthand" in prop && "key" in prop && "name" in prop.key) {
      if (prop.key.name === "tableQueryResult") {
        prop.key.name = "tableQuery";

        if (prop.shorthand) {
          prop.shorthand = false;
          prop.value = j.identifier("tableQueryResult");
        } else {
          if (prop.key.name === prop?.value?.name) {
            prop.shorthand = true;
          }
        }
      }
    }
  };

  ["useTable", "useDataGrid"].forEach((hookName) => {
    source
      .find(j.VariableDeclarator, {
        id: { type: "ObjectPattern" },
        init: { callee: { name: hookName } },
      })
      .forEach((path) => {
        if ("properties" in path.node.id) {
          path.node.id.properties.forEach((prop) => {
            // just a type guard
            if ("shorthand" in prop && "key" in prop && "name" in prop.key) {
              switch (prop.key.name) {
                case "refineCore":
                  if ("properties" in prop.value) {
                    prop.value.properties.forEach(renameProperties);
                  }
                  return;

                default:
                  renameProperties(prop);
              }
            }
          });
        }
      });
  });

  return source.toSource();
}
