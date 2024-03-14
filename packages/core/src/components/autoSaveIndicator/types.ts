import { UseUpdateReturnType } from "../../hooks/data/useUpdate";
import { AutoSaveIndicatorElements } from "../../hooks/form/types";
import { BaseRecord, HttpError } from "../../interfaces";

export type AutoSaveIndicatorProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  /**
   * The data returned by the update request.
   */
  data?: UseUpdateReturnType<TData, TError, TVariables>["data"];
  /**
   * The error returned by the update request.
   */
  error?: UseUpdateReturnType<TData, TError, TVariables>["error"];
  /**
   * The status of the update request.
   */
  status: UseUpdateReturnType<TData, TError, TVariables>["status"];
  /**
   * The elements to display for each status.
   */
  elements?: AutoSaveIndicatorElements;
};
