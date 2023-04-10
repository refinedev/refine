import { InferencerComponentProps } from "@/types";

type Action = keyof NonNullable<InferencerComponentProps["meta"]>[string];

export const getMetaProps = (
    identifier?: string,
    meta?: InferencerComponentProps["meta"],
    action?: Action,
) => {
    if (meta && action && identifier) {
        const metaValues = identifier ? meta[identifier] : {};
        const metaValue = metaValues?.[action] ?? metaValues?.default;
        if (metaValue) {
            return `meta: ${JSON.stringify(metaValue)},`;
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
