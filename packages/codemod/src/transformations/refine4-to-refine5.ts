import type { API, FileInfo } from "jscodeshift";

import { removeV3LegacyAuthProviderCompatibleFromAuthHooks } from "./v5/remove-v3LegacyAuthProviderCompatible-from-auth-hooks";
import { renameUseFormQueryResultAndMutationResult } from "./rename-query-and-mutation-result/use-form-query-and-mutation-result";
import { renameUseTableQueryResult } from "./rename-query-and-mutation-result/use-table-query-result";
import { removeUseNewQueryKeysFromRefineOptions } from "./v5/remove-useNewQueryKeys-from-refine-options";
import { renameITreeMenuToTreeMenuItem } from "./v5/rename-itreemenu-to-treemenuitem";
import { routerBindingsTypeToProvider } from "./v5/router-bindings-type-to-provider";
import { authBindingsTypeToProvider } from "./v5/auth-bindings-type-to-provider";
import { renameThemedV2Imports } from "./v5/rename-themed-v2-imports";
import { renameCurrentToCurrentPage } from "./v5/rename-current-to-currentPage";
import { renamePaginationCurrentToCurrentPage } from "./v5/rename-pagination-current-to-currentPage";

export default function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const source = j(file.source);

  removeUseNewQueryKeysFromRefineOptions(j, source);
  removeV3LegacyAuthProviderCompatibleFromAuthHooks(j, source);
  renameUseTableQueryResult(j, source);
  renameUseFormQueryResultAndMutationResult(j, source);
  renameITreeMenuToTreeMenuItem(j, source);
  routerBindingsTypeToProvider(j, source);
  authBindingsTypeToProvider(j, source);
  renameThemedV2Imports(j, source);
  renameCurrentToCurrentPage(j, source);
  renamePaginationCurrentToCurrentPage(j, source);

  return source.toSource();
}
