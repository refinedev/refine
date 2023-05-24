import { IResourceItem } from "@refinedev/core";
import { prettyString } from "../pretty-string";
import { toSingular } from "../to-singular";

export const translateActionTitle = (payload: {
    resource: IResourceItem;
    action: "list" | "create" | "edit" | "show";
    i18n?: boolean;
    noBraces?: boolean;
}) => {
    const { resource, action, i18n, noBraces } = payload;

    if (i18n) {
        const translateKey = `translate("${resource.name}.titles.${action}")`;
        if (noBraces) {
            return translateKey;
        }
        return `{${translateKey}}`;
    }

    return `${prettyString(toSingular(resource.name))} ${prettyString(action)}`;
};
