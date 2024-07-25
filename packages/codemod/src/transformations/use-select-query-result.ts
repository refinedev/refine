import type { API, FileInfo } from "jscodeshift";

// ```diff
// - const { queryResult, defaultValueQueryResult } = useSelect();
// + const { query, defaultValueQuery } = useSelect();
// ```
export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  const renameProperties = (prop) => {
    // just a type guard
    if ("shorthand" in prop && "key" in prop && "name" in prop.key) {
      const renameMap = {
        queryResult: "query",
        defaultValueQueryResult: "defaultValueQuery",
      };
      const newName = renameMap[prop.key.name];
      if (newName) {
        prop.key.name = newName;

        if (prop.shorthand) {
          prop.shorthand = false;
          prop.value = j.identifier(
            prop.key.name === "query"
              ? "queryResult"
              : "defaultValueQueryResult",
          );
        } else {
          if (prop.key.name === prop?.value?.name) {
            prop.shorthand = true;
          }
        }
      }
    }
  };

  ["useSelect", "useAutocomplete", "useCheckboxGroup", "useRadioGroup"].forEach(
    (hookName) => {
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
                renameProperties(prop);
              }
            });
          }
        });
    },
  );
  return source.toSource();
}
