import { InferencerComponentProps } from "../../types";

export type Action = keyof NonNullable<
    InferencerComponentProps["meta"]
>[string];

export const getMetaProps = (
    identifier?: string,
    meta?: InferencerComponentProps["meta"],
    actions?: Action[],
) => {
    if (meta && actions && identifier) {
        const metaByIdentifier = identifier ? meta[identifier] : {};
        const metaByActions: string[] = [];

        // get meta values for each action
        actions.forEach((action) => {
            const { gqlQuery, gqlMutation, ...metaValue } =
                metaByIdentifier?.[action] || {};

            // add all meta values besides gqlQuery, gqlMutation, and default
            Object.keys(metaValue).forEach((key) => {
                metaByActions.push(`${key}: ${JSON.stringify(metaValue[key])}`);
            });

            // manipulate gqlQuery and add
            if (gqlQuery) {
                metaByActions.push(
                    `gqlQuery: gql\`${gqlQuery?.loc?.source?.body}\``,
                );
            }

            // manipulate gqlQuery and add
            if (gqlMutation) {
                metaByActions.push(
                    `gqlMutation: gql\`${gqlMutation?.loc?.source?.body}\``,
                );
            }

            // if no action, use default
            const defaultKey = metaByIdentifier?.["default"];
            if (defaultKey) {
                // manipulate gqlQuery and add
                if (defaultKey?.gqlQuery) {
                    metaByActions.push(
                        `gqlQuery: gql\`${defaultKey.gqlQuery?.loc?.source?.body}\``,
                    );
                }

                // manipulate gqlMutation and add
                if (defaultKey?.gqlMutation) {
                    metaByActions.push(
                        `gqlMutation: gql\`${defaultKey.gqlQuery?.loc?.source?.body}\``,
                    );
                }

                // if not gqlQuery or gqlMutation, add without manipulation
                Object.keys(defaultKey).forEach((key) => {
                    if (key !== "gqlQuery" && key !== "gqlMutation") {
                        metaByActions.push(
                            `${key}: ${JSON.stringify(defaultKey[key])}`,
                        );
                    }
                });
            }
        });

        const metaValues = metaByActions.join(", ");
        if (!!metaValues.length) {
            return `meta:{${metaValues}}`;
        }

        return "";
    }
    return "";
};

export const pickMeta = (
    identifier?: string,
    meta?: InferencerComponentProps["meta"],
    actions?: Action[],
) => {
    if (meta && actions && identifier) {
        const metaValues = identifier ? meta[identifier] : {};

        const actionsToCheck = [...actions, "default"] as Action[];

        const metaValue = actionsToCheck.reduce((acc, action) => {
            return acc ?? metaValues?.[action];
        }, undefined as Record<string, unknown> | undefined);

        if (metaValue) {
            return metaValue;
        }
    }
    return undefined;
};
