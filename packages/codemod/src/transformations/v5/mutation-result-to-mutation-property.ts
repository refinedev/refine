import type { Collection, JSCodeshift } from "jscodeshift";

// List of mutation hooks affected by this change
const MUTATION_HOOKS = [
  "useCreate",
  "useCreateMany",
  "useUpdate",
  "useUpdateMany",
  "useDelete",
  "useDeleteMany",
  "useCustomMutation",
];

export const mutationResultToMutationProperty = (
  j: JSCodeshift,
  root: Collection<any>,
) => {
  // Find all destructuring assignments from mutation hooks
  root
    .find(j.VariableDeclarator)
    .filter((path) => {
      const { node } = path;
      return (
        node.id?.type === "ObjectPattern" &&
        node.init?.type === "CallExpression" &&
        node.init.callee?.type === "Identifier" &&
        MUTATION_HOOKS.includes(node.init.callee.name)
      );
    })
    .forEach((path) => {
      const { node } = path;
      const objectPattern = node.id as any;
      const hookName = (node.init as any).callee.name;

      // Track if we need to move mutation-related properties
      const mutationProperties: any[] = [];
      const newProperties = [];
      let hasDirectMutationAccess = false;

      for (const prop of objectPattern.properties) {
        if (
          (prop.type === "ObjectProperty" || prop.type === "Property") &&
          prop.key?.type === "Identifier"
        ) {
          const propertyName = prop.key.name;

          // Properties that are now under the mutation object
          if (
            [
              "isPending",
              "isLoading",
              "isError",
              "isSuccess",
              "isIdle",
              "data",
              "error",
              "status",
              "failureCount",
              "failureReason",
              "isPaused",
              "variables",
              "submittedAt",
              "context",
              "reset",
            ].includes(propertyName)
          ) {
            mutationProperties.push(prop);
            hasDirectMutationAccess = true;
          } else {
            // Keep other properties (mutate, mutateAsync, overtime)
            newProperties.push(prop);
          }
        } else {
          // Keep non-identifier properties as-is
          newProperties.push(prop);
        }
      }

      // If we have mutation properties, wrap them in a mutation object
      if (hasDirectMutationAccess) {
        const mutationObjectPattern = j.objectProperty(
          j.identifier("mutation"),
          j.objectPattern(mutationProperties),
        );
        newProperties.push(mutationObjectPattern);
      }

      objectPattern.properties = newProperties;
    });

  // Transform direct property access on mutation variables
  // Find variable declarations that extract mutation hooks
  const mutationVariableNames = new Set<string>();

  root
    .find(j.VariableDeclarator)
    .filter((path) => {
      const { node } = path;
      return (
        node.init?.type === "CallExpression" &&
        node.init.callee?.type === "Identifier" &&
        MUTATION_HOOKS.includes(node.init.callee.name)
      );
    })
    .forEach((path) => {
      const { node } = path;
      if (node.id?.type === "Identifier") {
        mutationVariableNames.add(node.id.name);
      }
    });

  // Transform property access patterns
  mutationVariableNames.forEach((varName) => {
    // Transform direct property access like `mutationResult.isPending` to `mutationResult.mutation.isPending`
    root
      .find(j.MemberExpression)
      .filter((path) => {
        const expr = path.value;
        return (
          j.Identifier.check(expr.object) &&
          expr.object.name === varName &&
          j.Identifier.check(expr.property) &&
          [
            "isPending",
            "isLoading",
            "isError",
            "isSuccess",
            "isIdle",
            "data",
            "error",
            "status",
            "failureCount",
            "failureReason",
            "isPaused",
            "variables",
            "submittedAt",
            "context",
            "reset",
          ].includes(expr.property.name)
        );
      })
      .replaceWith((path) => {
        const expr = path.value;
        return j.memberExpression(
          j.memberExpression(expr.object, j.identifier("mutation")),
          expr.property,
        );
      });

    // Transform optional chaining like `mutationResult?.isPending` to `mutationResult?.mutation?.isPending`
    root
      .find(j.OptionalMemberExpression)
      .filter((path) => {
        const expr = path.value;
        return (
          j.Identifier.check(expr.object) &&
          expr.object.name === varName &&
          j.Identifier.check(expr.property) &&
          [
            "isPending",
            "isLoading",
            "isError",
            "isSuccess",
            "isIdle",
            "data",
            "error",
            "status",
            "failureCount",
            "failureReason",
            "isPaused",
            "variables",
            "submittedAt",
            "context",
            "reset",
          ].includes(expr.property.name)
        );
      })
      .replaceWith((path) => {
        const expr = path.value;
        return j.optionalMemberExpression(
          j.optionalMemberExpression(expr.object, j.identifier("mutation")),
          expr.property,
        );
      });
  });
};

export default function transform(file: any, api: any) {
  const j = api.jscodeshift;
  const root = j(file.source);

  mutationResultToMutationProperty(j, root);

  return root.toSource();
}

export const parser = "tsx";
