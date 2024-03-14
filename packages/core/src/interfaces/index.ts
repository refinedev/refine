import { IResourceItem } from "./bindings/resource";

// contexts
export * from "../contexts/refine/IRefineContext";
export * from "../contexts/undoableQueue/IUndoableQueueContext";
export * from "../contexts/resource/IResourceContext";
export * from "../contexts/unsavedWarn/IUnsavedWarnContext";
export * from "../contexts/legacy-router/IRouterContext";

export * from "../components/pages/login";

// actions
export * from "./actions";

// notification
export * from "./notification";

// mutationMode
export * from "./mutationMode";

// mutationMode
export * from "./errors";

// custom components
export * from "./customComponents";

// resourceRouterParams
export * from "./resourceRouterParams";

// resourceErrorRouterParams
export * from "./resourceErrorRouterParams";

// mapData
export * from "./mapDataFn";

//metaData
export * from "./metaData";

//queryKeys
export * from "./queryKey";

//auditLog
export * from "./auditLog";

export type BaseKey = string | number;
export type BaseRecord = {
  id?: BaseKey;
  [key: string]: any;
};
export type BaseOption = {
  label: any;
  value: any;
};

/**
 * @deprecated Use `BaseOption` instead.
 */
export interface Option extends BaseOption {}

/* Backward compatible version of 'TreeMenuItem' */
export type ITreeMenu = IResourceItem & {
  key?: string;
  children: ITreeMenu[];
};

export type IMenuItem = IResourceItem & {
  key: string;
  route: string;
};

export * from "./form-url-params";

export * from "./auth";

export * from "./bindings";

export * from "./prettify";

export * from "./autoSave";

export * from "./textTransformers";

export * from "./optimistic-update-map";
