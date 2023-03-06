import { API, FileInfo } from "jscodeshift";
import { addV3LegacyAuthProviderCompatibleTrueToAuthHooks } from "./v4/add-v3LegacyAuthProviderCompatible-true-to-auth-hooks";
import { authProviderToLegacyAuthProvider } from "./v4/authProvider-to-legacyAuthProvider";
import { metaDataToMeta } from "./v4/metadata-to-meta";
import { moveDeprecatedAccessControlProps } from "./v4/move-deprecated-access-control";
import { routerToLegacyRouter } from "./v4/router-to-legacy-router";
import { renameResourcePropInButtons } from "./v4/rename-buttons-resource-prop";
import {
    separateImportsAntD,
    separateImportsAntDPostTransform,
} from "./v4/separate-imports-antd";
import {
    separateImportsChakra,
    separateImportsChakraPostTransform,
} from "./v4/separate-imports-chakra";
import {
    separateImportsMantine,
    separateImportsMantinePostTransform,
} from "./v4/separate-imports-mantine";
import {
    separateImportsMUI,
    separateImportsMUIPostTransform,
} from "./v4/separate-imports-mui";
import {
    separateImportsReactHookForm,
    separateImportsReactHookFormPostTransform,
} from "./v4/separate-imports-react-hook-form";
import {
    separateImportsReactQuery,
    separateImportsReactQueryPostTransform,
} from "./v4/separate-imports-react-query";
import {
    separateImportsReactTable,
    separateImportsReactTablePostTransform,
} from "./v4/separate-imports-react-table";
import { useMenuToCore } from "./v4/use-menu-to-core";
import {
    separateImportsReactRouterV6,
    separateImportsReactRouterV6PostTransform,
} from "./v4/separate-imports-react-router-v6";
import { fixV4Deprecations } from "./v4/fix-v4-deprecations";

export async function postTransform(files: any, flags: any) {
    await separateImportsAntDPostTransform(files, flags);
    await separateImportsChakraPostTransform(files, flags);
    await separateImportsMantinePostTransform(files, flags);
    await separateImportsMUIPostTransform(files, flags);
    await separateImportsReactHookFormPostTransform(files, flags);
    await separateImportsReactQueryPostTransform(files, flags);
    await separateImportsReactTablePostTransform(files, flags);
    await separateImportsReactRouterV6PostTransform(files, flags);
}

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    fixV4Deprecations(j, source);
    separateImportsReactRouterV6(j, source);
    addV3LegacyAuthProviderCompatibleTrueToAuthHooks(j, source);
    authProviderToLegacyAuthProvider(j, source);
    metaDataToMeta(j, source);
    moveDeprecatedAccessControlProps(j, source);
    renameResourcePropInButtons(j, source);
    routerToLegacyRouter(j, source);
    separateImportsAntD(j, source);
    separateImportsChakra(j, source);
    separateImportsMantine(j, source);
    separateImportsMUI(j, source);
    separateImportsReactHookForm(j, source);
    separateImportsReactQuery(j, source);
    separateImportsReactTable(j, source);
    useMenuToCore(j, source);

    return source.toSource();
}
