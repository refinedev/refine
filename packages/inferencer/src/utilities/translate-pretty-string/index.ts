import { IResourceItem } from "@refinedev/core";
import { prettyString } from "../pretty-string";
import { InferField } from "../../types";

export const translatePrettyString = (payload: {
    resource: IResourceItem;
    field: InferField;
    i18n?: boolean;
    wrapper?: string;
}) => {
    const { resource, field, i18n } = payload;
    let { wrapper } = payload;
    if (wrapper) {
        wrapper = `"`;
    }

    if (i18n) {
        return `{translate("${resource.name}.fields.${field.key}")}`;
    }

    return `${wrapper}${prettyString(field.key)}${wrapper}`;
};
