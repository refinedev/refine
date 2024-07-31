import type { API, FileInfo } from "jscodeshift";
import { renameUseFormQueryResultAndMutationResult } from "./august2024-release/use-form-query-and-mutation-result";
import { renameUseSelectQueryResult } from "./august2024-release/use-select-query-result";
import { renameUseShowQueryResult } from "./august2024-release/use-show-query-result";
import { renameUseSimpleListQueryResult } from "./august2024-release/use-simple-list-query-result";
import { renameUseTableQueryResult } from "./august2024-release/use-table-query-result";

export const parser = "tsx";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const source = j(file.source);

  renameUseFormQueryResultAndMutationResult(j, source);
  renameUseSelectQueryResult(j, source);
  renameUseShowQueryResult(j, source);
  renameUseSimpleListQueryResult(j, source);
  renameUseTableQueryResult(j, source);

  return source.toSource();
}
