import type { namedTypes } from "ast-types";
import type {
  API,
  ASTPath,
  Collection,
  FileInfo,
  JSCodeshift,
  Options,
} from "jscodeshift";

export const parser = "tsx";

const transformRefineOptions = (
  j: JSCodeshift,
  root: Collection<any>,
  projectId: string,
) => {
  const refineElements: Array<ASTPath<namedTypes.JSXElement>> = [];

  root.findJSXElements("Refine").forEach((path) => {
    refineElements.push(path);
  });

  for (const path of refineElements) {
    const props = path.node.openingElement.attributes;

    const optionsProp: any = props?.find(
      (attribute) =>
        attribute.type === "JSXAttribute" && attribute.name.name === "options",
    );
    if (!optionsProp) {
      path.node.openingElement.attributes?.push(
        j.jsxAttribute(
          j.jsxIdentifier("options"),
          j.jsxExpressionContainer(
            j.objectExpression([
              j.objectProperty(
                j.identifier("projectId"),
                j.stringLiteral(projectId),
              ),
            ]),
          ),
        ),
      );

      break;
    }

    // for  options={optionsProp}
    if (!optionsProp?.value.expression.properties) {
      break;
    }

    // for options has already projectId
    const hasProjectId = optionsProp?.value.expression.properties.find(
      (p: any) => {
        if (p.type === "ObjectProperty") {
          return p.key.name === "projectId";
        }

        return false;
      },
    );

    if (hasProjectId) break;

    optionsProp?.value.expression.properties.push(
      j.objectProperty(j.identifier("projectId"), j.stringLiteral(projectId)),
    );

    break;
  }

  return root;
};

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options,
) {
  const j = api.jscodeshift;
  const source = j(file.source);

  transformRefineOptions(j, source, options.__projectId);

  return source.toSource();
}
